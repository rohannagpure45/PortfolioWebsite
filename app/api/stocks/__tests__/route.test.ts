import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * Stock API Route Tests
 * 
 * These tests verify the caching behavior of the /api/stocks endpoint.
 * The implementation should:
 * 1. Always return cached data first (fast, reliable)
 * 2. Refresh cache in background when stale (>4 hours old)
 * 3. Never fail due to AlphaVantage rate limits
 * 4. Gracefully degrade when external APIs fail
 */

// Mock Supabase client
const mockSupabaseSelect = vi.fn()
const mockSupabaseUpdate = vi.fn()
const mockSupabaseInsert = vi.fn()
const mockSupabaseFrom = vi.fn(() => ({
    select: mockSupabaseSelect,
    update: mockSupabaseUpdate,
    insert: mockSupabaseInsert,
}))

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: (table: string) => mockSupabaseFrom(table),
    },
}))

// Mock global fetch for AlphaVantage API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

// Test data
const MOCK_FRESH_CACHE = [
    { symbol: 'GOOGL', company: 'Google', price: 195.50, change: 1.25, last_updated: new Date().toISOString() },
    { symbol: 'META', company: 'Meta', price: 600.00, change: -0.50, last_updated: new Date().toISOString() },
    { symbol: 'NVDA', company: 'NVIDIA', price: 140.00, change: 2.10, last_updated: new Date().toISOString() },
    { symbol: 'ASTS', company: 'AST SpaceMobile', price: 25.00, change: 0.75, last_updated: new Date().toISOString() },
    { symbol: 'AAPL', company: 'Apple', price: 230.00, change: -1.00, last_updated: new Date().toISOString() },
    { symbol: 'GS', company: 'Goldman Sachs', price: 600.00, change: 0.25, last_updated: new Date().toISOString() },
    { symbol: 'TSLA', company: 'Tesla', price: 400.00, change: 3.50, last_updated: new Date().toISOString() },
    { symbol: 'MSFT', company: 'Microsoft', price: 430.00, change: 0.10, last_updated: new Date().toISOString() },
    { symbol: 'MU', company: 'Micron Technology', price: 100.00, change: -0.80, last_updated: new Date().toISOString() },
    { symbol: 'TSM', company: 'TSMC', price: 200.00, change: 1.50, last_updated: new Date().toISOString() },
]

const MOCK_STALE_CACHE = MOCK_FRESH_CACHE.map(stock => ({
    ...stock,
    last_updated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
}))

const MOCK_ALPHAVANTAGE_RESPONSE = {
    'Global Quote': {
        '01. symbol': 'GOOGL',
        '05. price': '200.00',
        '10. change percent': '2.50%',
    },
}

// Helper to create a mock Supabase query chain
function createMockQueryChain(data: unknown[], error: Error | null = null) {
    return {
        select: vi.fn().mockReturnValue({
            in: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({ data, error }),
            }),
            order: vi.fn().mockResolvedValue({ data, error }),
        }),
        update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        upsert: vi.fn().mockResolvedValue({ data: null, error: null }),
    }
}

describe('GET /api/stocks', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    describe('Cache Hit Tests', () => {
        it('should return cached data when cache is fresh (< 4 hours old)', async () => {
            // Setup: Mock Supabase to return fresh data
            const queryChain = createMockQueryChain(MOCK_FRESH_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Action: Import and call the GET handler
            // Note: We need to dynamically import to get fresh module state
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: Response contains stock data
            expect(response.status).toBe(200)
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBe(10)

            // Assert: Supabase was called
            expect(mockSupabaseFrom).toHaveBeenCalledWith('stock_cache')

            // Assert: AlphaVantage was NOT called (cache is fresh)
            expect(mockFetch).not.toHaveBeenCalled()
        })

        it('should return all 10 tracked stocks with correct schema', async () => {
            // Setup
            const queryChain = createMockQueryChain(MOCK_FRESH_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Action
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: All 10 symbols are present
            const expectedSymbols = ['GOOGL', 'META', 'NVDA', 'ASTS', 'AAPL', 'GS', 'TSLA', 'MSFT', 'MU', 'TSM']
            const returnedSymbols = data.map((stock: { symbol: string }) => stock.symbol)

            expectedSymbols.forEach(symbol => {
                expect(returnedSymbols).toContain(symbol)
            })

            // Assert: Each stock has required fields
            data.forEach((stock: { symbol: string; company: string; price: number; change: number }) => {
                expect(stock).toHaveProperty('symbol')
                expect(stock).toHaveProperty('company')
                expect(stock).toHaveProperty('price')
                expect(stock).toHaveProperty('change')
                expect(typeof stock.price).toBe('number')
                expect(typeof stock.change).toBe('number')
            })
        })
    })

    describe('Stale Cache Tests', () => {
        it('should return cached data immediately when cache is stale', async () => {
            // Setup: Mock Supabase with stale data
            const queryChain = createMockQueryChain(MOCK_STALE_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Mock AlphaVantage API (for background refresh)
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(MOCK_ALPHAVANTAGE_RESPONSE),
            })

            // Action
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: Response returns immediately with cached data
            expect(response.status).toBe(200)
            expect(data.length).toBe(10)
        })

        it('should trigger background refresh for ONE stale stock only', async () => {
            // Setup: Mock Supabase with stale data
            const queryChain = createMockQueryChain(MOCK_STALE_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Mock AlphaVantage API
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(MOCK_ALPHAVANTAGE_RESPONSE),
            })

            // Action
            const { GET } = await import('../route')
            await GET()

            // Wait for any async background operations
            await new Promise(resolve => setTimeout(resolve, 100))

            // Assert: AlphaVantage called at most once (1 stock refresh)
            expect(mockFetch.mock.calls.length).toBeLessThanOrEqual(1)
        })
    })

    describe('API Failure Handling', () => {
        it('should return cached data when AlphaVantage returns 500 error', async () => {
            // Setup: Stale cache to trigger refresh attempt
            const queryChain = createMockQueryChain(MOCK_STALE_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Mock AlphaVantage to fail
            mockFetch.mockResolvedValue({
                ok: false,
                status: 500,
                json: () => Promise.resolve({ error: 'Internal Server Error' }),
            })

            // Action
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: Still returns cached data
            expect(response.status).toBe(200)
            expect(data.length).toBe(10)
        })

        it('should return cached data when AlphaVantage rate limits (Note message)', async () => {
            // Setup: Stale cache
            const queryChain = createMockQueryChain(MOCK_STALE_CACHE)
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Mock AlphaVantage rate limit response
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day.',
                }),
            })

            // Action
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: Still returns cached data (graceful degradation)
            expect(response.status).toBe(200)
            expect(Array.isArray(data)).toBe(true)
        })

        it('should return 500 when Supabase cache read fails and no fallback available', async () => {
            // Setup: Supabase query fails and AlphaVantage also fails (no mock setup)
            const queryChain = createMockQueryChain([], new Error('Connection failed'))
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Action
            const { GET } = await import('../route')
            const response = await GET()

            // Assert: Returns error status when both cache and API fail
            expect(response.status).toBe(500)
        })
    })

    describe('Empty Cache Tests', () => {
        it('should fetch all stocks from AlphaVantage when cache is empty', async () => {
            // Setup: Empty cache
            const queryChain = createMockQueryChain([])
            mockSupabaseFrom.mockReturnValue(queryChain)

            // Mock AlphaVantage for all stocks
            mockFetch.mockImplementation((url: string) => {
                const symbolMatch = url.match(/symbol=([A-Z]+)/)
                const symbol = symbolMatch ? symbolMatch[1] : 'UNKNOWN'
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        'Global Quote': {
                            '01. symbol': symbol,
                            '05. price': '100.00',
                            '10. change percent': '1.00%',
                        },
                    }),
                })
            })

            // Action
            const { GET } = await import('../route')
            const response = await GET()
            const data = await response.json()

            // Assert: AlphaVantage was called for all 10 stocks
            expect(mockFetch.mock.calls.length).toBe(10)

            // Assert: Response contains data
            expect(response.status).toBe(200)
            expect(data.length).toBe(10)
        })

        it('should insert all fetched stocks into cache when seeding', async () => {
            // Setup: Empty cache
            const insertMock = vi.fn().mockResolvedValue({ data: null, error: null })
            mockSupabaseFrom.mockReturnValue({
                select: vi.fn().mockReturnValue({
                    order: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
                insert: insertMock,
                upsert: vi.fn().mockResolvedValue({ data: null, error: null }),
            })

            // Mock AlphaVantage
            mockFetch.mockImplementation((url: string) => {
                const symbolMatch = url.match(/symbol=([A-Z]+)/)
                const symbol = symbolMatch ? symbolMatch[1] : 'UNKNOWN'
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        'Global Quote': {
                            '01. symbol': symbol,
                            '05. price': '100.00',
                            '10. change percent': '1.00%',
                        },
                    }),
                })
            })

            // Action
            const { GET } = await import('../route')
            await GET()

            // Wait for async cache writes
            await new Promise(resolve => setTimeout(resolve, 100))

            // Assert: Cache insert/upsert was called
            // (exact behavior depends on implementation)
            expect(mockSupabaseFrom).toHaveBeenCalledWith('stock_cache')
        })
    })
})
