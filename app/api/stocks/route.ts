import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const ALPHA_VANTAGE_API_URL = "https://www.alphavantage.co/query"

// 4 hours in milliseconds
const CACHE_DURATION_MS = 4 * 60 * 60 * 1000

// Type definition for stock cache entries
interface StockCache {
  id?: number
  symbol: string
  company: string
  price: number
  change: number
  last_updated: string
}

export async function GET() {
  const symbols = ["GOOGL", "META", "NVDA", "ASTS", "AAPL", "GS", "TSLA", "MSFT", "MU", "TSM"]

  try {
    // 1. Try to get from cache first
    let cachedData: StockCache[] = []

    if (supabase && symbols.length > 0) {
      const { data, error } = await supabase
        .from("stock_cache")
        .select("*")
        .in("symbol", symbols)
        .order("id")

      if (error) {
        console.error("Supabase error:", error)
      } else if (data) {
        cachedData = data as StockCache[]
      }
    }

    // 2. If valid cache exists
    if (cachedData.length > 0) {
      // Check if we need to refresh (background)
      // Find the oldest record
      const sortedByDate = [...cachedData].sort(
        (a, b) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      )
      const oldest = sortedByDate[0]
      const age = Date.now() - new Date(oldest.last_updated).getTime()

      if (age > CACHE_DURATION_MS) {
        console.log(`Refreshing stale stock: ${oldest.symbol} (Age: ${Math.round(age / 1000 / 60)}m)`)
        // Trigger background refresh - do NOT await to keep response fast
        refreshStock(oldest.symbol).catch((err) => console.error("Background refresh failed:", err))
      }

      return NextResponse.json(cachedData)
    }

    // 3. Cache empty or failed? -> Fallback to fetch ALL (only if really empty)
    console.log("Cache empty or unavailable, performing full fetch...")

    // We fetch one by one to be gentle, or parallel if we have quota. 
    // Initial seed uses 10 calls.
    const stockData = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await fetchStockData(symbol)
        return {
          symbol,
          ...data,
        }
      }),
    )

    // Seed cache if possible
    if (supabase) {
      try {
        // Formatting for DB upsert
        const rows = stockData.map((s) => ({
          symbol: s.symbol,
          company: s.company,
          price: s.price,
          change: s.change,
          last_updated: new Date().toISOString(),
        }))

        const { error: upsertError } = await supabase
          .from("stock_cache")
          .upsert(rows, { onConflict: "symbol" })

        if (upsertError) {
          console.error("Failed to upsert cache:", upsertError)
        }
      } catch (err) {
        console.error("Failed to seed cache:", err)
      }
    }

    return NextResponse.json(stockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}

async function fetchStockData(symbol: string) {
  const response = await fetch(
    `${ALPHA_VANTAGE_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
  )
  const data = await response.json()

  // Check for API limit message or error
  if (data.Note || data.Information) {
    throw new Error("AlphaVantage API limit reached or API info message received")
  }

  const quote = data["Global Quote"]
  if (!quote) {
    throw new Error(`No quote data for ${symbol}`)
  }

  const priceStr = quote["05. price"] ?? "0"
  const changeStr = String(quote["10. change percent"] ?? "0%").replace("%", "")

  return {
    company: getCompanyName(symbol),
    price: Number.parseFloat(priceStr),
    change: Number.parseFloat(changeStr),
  }
}

async function refreshStock(symbol: string) {
  if (!supabase) return

  try {
    const data = await fetchStockData(symbol)

    await supabase
      .from("stock_cache")
      .update({
        price: data.price,
        change: data.change,
        last_updated: new Date().toISOString(),
      })
      .eq("symbol", symbol)
  } catch (error) {
    console.error(`Failed to refresh stock ${symbol}:`, error)
  }
}

function getCompanyName(symbol: string): string {
  const companies: { [key: string]: string } = {
    GOOGL: "Google",
    META: "Meta",
    NVDA: "NVIDIA",
    ASTS: "AST SpaceMobile",
    AAPL: "Apple",
    GS: "Goldman Sachs",
    TSLA: "Tesla",
    MSFT: "Microsoft",
    MU: "Micron Technology",
    TSM: "TSMC",
  }
  return companies[symbol] || symbol
}
