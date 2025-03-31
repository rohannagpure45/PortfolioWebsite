import { NextResponse } from "next/server"

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const ALPHA_VANTAGE_API_URL = "https://www.alphavantage.co/query"

export async function GET() {
  const symbols = ["GOOGL", "META", "NVDA", "ASTS", "AAPL", "GS", "TSLA", "MSFT"]

  try {
    const stockData = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(
          `${ALPHA_VANTAGE_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
        )
        const data = await response.json()
        const quote = data["Global Quote"]
        return {
          symbol: quote["01. symbol"],
          company: getCompanyName(quote["01. symbol"]),
          price: Number.parseFloat(quote["05. price"]),
          change: Number.parseFloat(quote["10. change percent"].replace("%", "")),
        }
      }),
    )

    return NextResponse.json(stockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
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
  }
  return companies[symbol] || symbol
}

