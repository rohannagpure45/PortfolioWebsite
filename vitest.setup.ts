import { vi } from 'vitest'

// Mock Next.js server components
vi.mock('next/server', () => ({
    NextResponse: {
        json: (data: unknown, init?: ResponseInit) => {
            return new Response(JSON.stringify(data), {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    ...init?.headers,
                },
            })
        },
    },
}))
