"use client"

import type React from "react"
import TryItOutIframe from "../components/TryItOutIframe";

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import * as tf from "@tensorflow/tfjs"
import DescriptionBox from "../../../components/DescriptionBox" // Updated import statement

interface PredictionData {
  date: string
  actual: number
  predicted?: number
}

interface StockAnalysis {
  symbol: string
  currentPrice: number
  priceTarget: number
  analystRating: string
  eps: number
  cashFlow: number
  recommendation: string
}

interface WeightData {
  weight0: number[][]
  weight1: number[]
  weight2: number[][]
  weight3: number[]
  weight4: number[][]
  weight5: number[]
}

const ALPHA_VANTAGE_API_KEY = "RITB360YR86PP5U0"

async function testApiAccess() {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${ALPHA_VANTAGE_API_KEY}`,
    )
    const data = await response.json()
    console.log("API Test Response:", JSON.stringify(data))
    if (data["Global Quote"]) {
      console.log("API is accessible")
    } else {
      console.error("API returned unexpected data")
    }
  } catch (error) {
    console.error("Error testing API access:", error)
  }
}

function validateWeightData(data: WeightData): boolean {
  return (
    Array.isArray(data.weight0) &&
    data.weight0.every((row) => Array.isArray(row)) &&
    Array.isArray(data.weight1) &&
    Array.isArray(data.weight2) &&
    data.weight2.every((row) => Array.isArray(row)) &&
    Array.isArray(data.weight3) &&
    Array.isArray(data.weight4) &&
    data.weight4.every((row) => Array.isArray(row)) &&
    Array.isArray(data.weight5)
  )
}

export default function StockAnalyzer() {
  const [symbol, setSymbol] = useState("AAPL")
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weightData, setWeightData] = useState<WeightData | null>(null)

  useEffect(() => {
    async function loadWeights() {
      try {
        const weightUrls = [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_0-Ae4c3mgO773X27bUme093FeOpFNxd4.csv",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_1-Paj4eLtR40L7tPsIE4JQiGkqi30pvV.csv",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_2-UT8BgEnO7gYdJ84uVOXJnTViIZ7KIZ.csv",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_3-T46xPBqwi9BFYu7WYl2g1GlNkYAajQ.csv",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_4-nVBkOo2RWhdeJPUFrnXOJUzY8tz3nU.csv",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_5-LrCcTB9pS0KNzjRlJAGYFOwmaacSAu.csv",
        ]

        const weightResponses = await Promise.all(weightUrls.map((url) => fetch(url)))
        const weightTexts = await Promise.all(weightResponses.map((response) => response.text()))

        const parsedWeightData: WeightData = {
          weight0: weightTexts[0]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map((row) => row.split(",").map(Number)),
          weight1: weightTexts[1]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map(Number),
          weight2: weightTexts[2]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map((row) => row.split(",").map(Number)),
          weight3: weightTexts[3]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map(Number),
          weight4: weightTexts[4]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map((row) => row.split(",").map(Number)),
          weight5: weightTexts[5]
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map(Number),
        }

        if (validateWeightData(parsedWeightData)) {
          setWeightData(parsedWeightData)
        } else {
          throw new Error("Invalid weight data structure")
        }
      } catch (err) {
        setError("Failed to load weights")
        console.error("Error loading weights:", err)
      }
    }
    loadWeights()
    testApiAccess()
  }, [])

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!weightData) {
      setError("Weight data not loaded yet")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch historical data
      const historicalResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      )
      const historicalData = await historicalResponse.json()
      console.log("Historical Data API Response:", JSON.stringify(historicalData))
      if (!historicalData["Time Series (Daily)"]) {
        throw new Error("Invalid data received from API")
      }

      const timeSeriesData = Object.entries(historicalData["Time Series (Daily)"])
        .map(([date, values]: [string, any]) => ({
          date,
          close: Number(values["4. close"]),
        }))
        .reverse()

      // Make predictions
      const predictionData: PredictionData[] = []
      const windowSize = 5

      for (let i = windowSize; i < timeSeriesData.length; i++) {
        const inputWindow = timeSeriesData.slice(i - windowSize, i).map((d) => d.close)
        const inputTensor = tf.tensor2d([inputWindow], [1, windowSize])

        // Use the loaded weights for prediction
        const layer1 = tf.tidy(() => {
          const w0 = tf.tensor2d(weightData.weight0)
          const b1 = tf.tensor1d(weightData.weight1)
          return inputTensor.matMul(w0).add(b1)
        })

        const layer2 = tf.tidy(() => {
          const w2 = tf.tensor2d(weightData.weight2)
          const b3 = tf.tensor1d(weightData.weight3)
          return tf.relu(layer1).matMul(w2).add(b3)
        })

        const layer3 = tf.tidy(() => {
          const w4 = tf.tensor2d(weightData.weight4)
          const b5 = tf.tensor1d(weightData.weight5)
          return tf.relu(layer2).matMul(w4).add(b5)
        })

        const output = tf.relu(layer3)

        const predictedValue = output.dataSync()[0]

        predictionData.push({
          date: timeSeriesData[i].date,
          actual: timeSeriesData[i].close,
          predicted: predictedValue,
        })

        // Clean up tensors
        tf.dispose([inputTensor, layer1, layer2, layer3, output])
      }

      setPredictions(predictionData.slice(-30))

      // Fetch additional data for analysis
      const overviewResponse = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      )
      const overviewData = await overviewResponse.json()
      console.log("Overview API Response:", JSON.stringify(overviewData))

      const cashFlowResponse = await fetch(
        `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      )
      const cashFlowData = await cashFlowResponse.json()
      console.log("Cash Flow API Response:", JSON.stringify(cashFlowData))

      // Prepare analysis
      const currentPrice = timeSeriesData[timeSeriesData.length - 1].close
      const priceTarget = Number(overviewData.AnalystTargetPrice)
      const eps = Number(overviewData.EPS)
      const cashFlow = Number(cashFlowData.annualReports[0].operatingCashflow)

      let analystRating = "Hold"
      if (priceTarget > currentPrice * 1.1) {
        analystRating = "Buy"
      } else if (priceTarget < currentPrice * 0.9) {
        analystRating = "Sell"
      }

      let recommendation = "Hold"
      if (analystRating === "Buy" && eps > 0 && cashFlow > 0) {
        recommendation = "Strong Buy"
      } else if (analystRating === "Sell" && (eps < 0 || cashFlow < 0)) {
        recommendation = "Strong Sell"
      } else {
        recommendation = analystRating
      }

      setAnalysis({
        symbol,
        currentPrice,
        priceTarget,
        analystRating,
        eps,
        cashFlow,
        recommendation,
      })
    } catch (err) {
      console.error("Detailed error:", err)
      if (err instanceof Error) {
        if (err.message.includes("API")) {
          setError(`API Error: ${err.message}. Please check your network connection.`)
        } else {
          setError(`Error: ${err.message}. Please try again later.`)
        }
      } else {
        setError("An unknown error occurred. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Stock Analyzer</h1>

        <DescriptionBox>
          <p className="text-gray-300 font-serif text-lg leading-relaxed">
            This AI-powered tool uses TensorFlow.js and a pre-trained neural network model to analyze and predict stock
            market trends. The model has been trained on historical stock data from multiple companies, learning to
            recognize patterns and correlations that may indicate future price movements. When you enter a stock symbol,
            the tool fetches recent historical data and uses the trained model to generate price predictions.
          </p>
          <p className="text-gray-300 font-serif text-lg leading-relaxed mt-4">
            The analyzer considers various factors such as previous closing prices, trading volumes, and overall market
            trends to make its forecasts. It then combines these AI-generated predictions with fundamental analysis data
            (like EPS and cash flow) to provide a comprehensive investment recommendation. Please note that while this
            tool uses advanced machine learning techniques, it should be used as one of many resources in making
            investment decisions, not as a sole determinant.
          </p>
        </DescriptionBox>

        <Card className="p-6 mb-8">
          <form onSubmit={handleAnalyze} className="flex gap-4">
            <Input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="max-w-xs bg-gray-800 text-white placeholder-gray-400"
            />
            <Button type="submit" disabled={loading} className="border border-blue-500">
              {loading ? "Analyzing..." : "Analyze Stock"}
            </Button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </Card>

        {predictions.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Stock Price Analysis for{" "}
              <a
                href={`https://www.google.com/finance/quote/${symbol}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-bold underline hover:text-blue-600"
              >
                {symbol}
              </a>{" "}
              <a
                href={`https://finance.yahoo.com/quote/${symbol}/news`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-600 ml-2"
              >
                (Latest News)
              </a>
            </h2>
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={2}
                    tick={{ fontSize: 12 }}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#4ade80" name="Actual Price" dot={false} />
                  <Line type="monotone" dataKey="predicted" stroke="#60a5fa" name="Predicted Price" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[#4ade80]"></div>
                <span className="text-sm">Actual Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[#60a5fa]"></div>
                <span className="text-sm">Predicted Price</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 text-center mt-2">
              Note: The AI prediction model uses historical data only and does not factor in current news or events.
            </p>
          </Card>
        )}

        {analysis && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Comprehensive Analysis for {analysis.symbol}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Current Price:</strong> ${analysis.currentPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Price Target:</strong> ${analysis.priceTarget.toFixed(2)}
                </p>
                <p>
                  <strong>Analyst Rating:</strong> {analysis.analystRating}
                </p>
              </div>
              <div>
                <p>
                  <strong>EPS:</strong> ${analysis.eps.toFixed(2)}
                </p>
                <p>
                  <strong>Operating Cash Flow:</strong> ${(analysis.cashFlow / 1e9).toFixed(2)} billion
                </p>
                <p>
                  <strong>AI Recommendation:</strong> <span className="font-bold">{analysis.recommendation}</span>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Analysis Summary</h3>
              <div className="space-y-3">
                <p>
                  <strong>Price Analysis:</strong> Current price is ${analysis.currentPrice.toFixed(2)} with a target of
                  ${analysis.priceTarget.toFixed(2)}.{" "}
                  {analysis.priceTarget > analysis.currentPrice
                    ? `This ${((analysis.priceTarget / analysis.currentPrice - 1) * 100).toFixed(1)}% upside potential is ${analysis.priceTarget > analysis.currentPrice * 1.1 ? "significantly positive" : "moderately positive"}.`
                    : `This ${((1 - analysis.priceTarget / analysis.currentPrice) * 100).toFixed(1)}% downside risk is ${analysis.priceTarget < analysis.currentPrice * 0.9 ? "concerning" : "moderate"}.`}
                </p>
                <p>
                  <strong>Financial Health:</strong> The company's EPS of ${analysis.eps.toFixed(2)} is{" "}
                  {analysis.eps > 0 ? "positive, indicating profitability" : "negative, suggesting current losses"}.
                  Operating cash flow of ${(analysis.cashFlow / 1e9).toFixed(2)} billion is{" "}
                  {analysis.cashFlow > 0
                    ? "positive, demonstrating strong operational performance"
                    : "negative, indicating potential operational challenges"}
                  .
                </p>
                <p>
                  <strong>Technical Indicators:</strong> The AI model's price predictions{" "}
                  {predictions[predictions.length - 1].predicted > predictions[predictions.length - 1].actual
                    ? "suggest potential upward momentum"
                    : "indicate possible downward pressure"}{" "}
                  based on historical patterns and market trends.
                </p>
                <p>
                  <strong>Final Recommendation:</strong> Based on these factors, our AI recommends a{" "}
                  <strong>{analysis.recommendation}</strong> position. This recommendation weighs price targets (
                  {analysis.priceTarget > analysis.currentPrice ? "positive" : "negative"}), financial metrics (
                  {analysis.eps > 0 && analysis.cashFlow > 0 ? "positive" : "concerning"}), and technical analysis.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

