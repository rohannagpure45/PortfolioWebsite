"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import DescriptionBox from "../components/DescriptionBox"; // Removed for cleaner styling

interface StockPosition {
  symbol: string;
  company: string;
  price: number;
  change: number;
  logo: string;
}

const companyLogos = {
  GOOGL: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cKwxh8OtAJKFY2UDxguFqOXar91fjg.png",
  META: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QvD6XOlpB9hHngpego5rG0dJSGP0HM.png",
  NVDA: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-laVPhifxAT81gHioLgZ5mKcg8UX9j1.png",
  GS: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1sQEFiRB5lCVSpicpMC50GJHqYUJOl.png",
  AAPL: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PTbHxCoorWCEdRIugq8giGxLcEY1la.png",
  TSLA: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fAxRCHCgOe5HdYrDoWc9ajj4iyqkw0.png",
  MSFT: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lNHdtVIvqEwMK5FMcACT56qa5yJyl5.png",
  ASTS: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f0W38ZttIm7VGOckayQPDWYqijLUjU.png",
};

export default function Home() {
  const [positions, setPositions] = useState<StockPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }
        const data = await response.json();
        const stocksWithLogos = data.map((stock: any) => ({
          ...stock,
          logo: companyLogos[stock.symbol] || "/placeholder.svg",
        }));
        setPositions(stocksWithLogos);
        setLoading(false);
      } catch (err) {
        setError(
          "Failed to load stock data. Please try again later. Maybe too many API calls (more than AlphaVantage permits daily)?"
        );
        setLoading(false);
      }
    }

    fetchStockData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Building the Future of Finance</h1>
          <p className="text-xl mb-8">
            Computer Science &amp; Business Administration Student at Northeastern University
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/projects"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Text Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <p className="text-gray-700 text-center max-w-3xl mx-auto font-serif text-lg leading-relaxed">
            Welcome to my personal website! As a student passionate about finance and technology, I wasn't
            quite sure what to showcase on my landing page. So, I decided to display my long-term stock
            holdings to set a financial theme. This portfolio reflects my interests in the market and
            serves as a starting point for exploring my projects and experiences in the world of fintech.
          </p>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="container mx-auto px-4 mb-8 flex-grow">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">My Investment Portfolio</h2>
          {loading ? (
            <p className="text-center text-gray-700">Loading market data...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-3 px-4 text-left font-semibold">Company</th>
                      <th className="py-3 px-4 text-left font-semibold">Symbol</th>
                      <th className="py-3 px-4 text-right font-semibold">Price</th>
                      <th className="py-3 px-4 text-right font-semibold">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position) => (
                      <tr
                        key={position.symbol}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <Image
                                src={position.logo || "/placeholder.svg"}
                                alt={position.company}
                                width={24}
                                height={24}
                                className="object-contain max-w-full max-h-full"
                              />
                            </div>
                            <a
                              href={`https://www.google.com/finance/quote/${position.symbol}:NASDAQ`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {position.company}
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-4">{position.symbol}</td>
                        <td className="py-3 px-4 text-right">${position.price.toFixed(2)}</td>
                        <td
                          className={`py-3 px-4 text-right ${
                            position.change >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {position.change >= 0 ? "+" : ""}
                          {position.change.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
