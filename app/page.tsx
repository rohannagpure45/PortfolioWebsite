"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface StockPosition {
  symbol: string;
  company: string;
  price: number;
  change: number;
  logo: string;
}

const companyLogos: Record<string, string> = {
  GOOGL: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cKwxh8OtAJKFY2UDxguFqOXar91fjg.png",
  META: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QvD6XOlpB9hHngpego5rG0dJSGP0HM.png",
  NVDA: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-laVPhifxAT81gHioLgZ5mKcg8UX9j1.png",
  GS: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1sQEFiRB5lCVSpicpMC50GJHqYUJOl.png",
  AAPL: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PTbHxCoorWCEdRIugq8giGxLcEY1la.png",
  TSLA: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fAxRCHCgOe5HdYrDoWc9ajj4iyqkw0.png",
  MSFT: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lNHdtVIvqEwMK5FMcACT56qa5yJyl5.png",
  ASTS: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f0W38ZttIm7VGOckayQPDWYqijLUjU.png",
  MU: "/placeholder.svg",
  TSM: "/placeholder.svg",
};

// Stock exchange mapping - NYSE tickers need different exchange
const stockExchanges: Record<string, string> = {
  GS: "NYSE",
  TSM: "NYSE",
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
        const stocksWithLogos = data.map((stock: StockPosition) => ({
          ...stock,
          logo: companyLogos[stock.symbol] || "/placeholder.svg",
        }));
        setPositions(stocksWithLogos);
        setLoading(false);
      } catch (err) {
        setError("Failed to load stock data. Please try again later.");
        setLoading(false);
      }
    }

    fetchStockData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center hero-gradient">
        {/* Subtle accent glow */}
        <div className="accent-glow top-1/4 -right-40 opacity-60" />
        <div className="accent-glow bottom-0 -left-40 opacity-40" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto stagger-children">
          <p className="text-[#d97757] font-medium tracking-wide uppercase text-sm mb-6">
            Computer Science & Business Administration
          </p>

          <h1
            className="text-5xl md:text-7xl font-bold mb-8 text-[#faf9f5] leading-tight"
            style={{ wordSpacing: '0.1em', letterSpacing: '-0.02em' }}
          >
            Building the Future
            <br />
            <span className="text-[#d97757]" style={{ letterSpacing: '0' }}>of Finance</span>
          </h1>

          <p className="text-xl text-[#b0aea5] mb-12 max-w-xl mx-auto leading-relaxed">
            Rohan Nagpure is a Northeastern University student passionate about fintech,
            building innovative solutions at the intersection of technology and finance.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn btn-primary">
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn btn-outline">
              About Me
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-[#b0aea5]/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#b0aea5]/50 rounded-full animate-pulse-subtle" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="card-elevated p-8">
          <div className="flex items-stretch gap-6">
            {/* Accent line */}
            <div className="w-1 bg-gradient-to-b from-[#d97757] to-[#d97757]/30 rounded-full flex-shrink-0" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-medium tracking-widest text-[#d97757] uppercase mb-2">
                Software Consulting
              </p>

              <h3 className="font-semibold text-2xl text-[#faf9f5] mb-3">
                Unbounded Scaling LLC
              </h3>

              <p className="text-[#b0aea5] mb-6 max-w-xl">
                Custom software solutions, built right. From MVPs to production-ready applications.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <a
                  href="tel:6093756850"
                  className="font-mono text-[#b0aea5] hover:text-[#d97757] transition-colors"
                >
                  (609) 375-6850
                </a>
                <span className="text-[#b0aea5]/30">·</span>
                <a
                  href="mailto:rohannagpure23@gmail.com"
                  className="text-[#b0aea5] hover:text-[#d97757] transition-colors inline-flex items-center gap-2 group"
                >
                  rohannagpure23@gmail.com
                  <svg
                    className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Text Section */}
      <section className="container mx-auto px-6 pb-12">
        <div className="card p-8 max-w-3xl mx-auto text-center">
          <p className="prose mx-auto">
            Welcome to my personal website! As a student passionate about finance and technology,
            I decided to showcase my long-term stock holdings to set a financial theme. This portfolio
            reflects my interests in the market and serves as a starting point for exploring my projects
            and experiences in the world of fintech.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="container mx-auto px-6 pb-20 flex-grow">
        <div className="card-elevated p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#faf9f5]">
            My Investment Portfolio
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-[#d97757] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#b0aea5]">Loading market data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 card bg-[#f87171]/5 border-[#f87171]/20">
              <p className="text-[#f87171]">{error}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#b0aea5]/10">
                      <th className="py-4 px-4 text-left font-semibold text-[#b0aea5] text-sm uppercase tracking-wider">
                        Company
                      </th>
                      <th className="py-4 px-4 text-left font-semibold text-[#b0aea5] text-sm uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="py-4 px-4 text-right font-semibold text-[#b0aea5] text-sm uppercase tracking-wider">
                        Price
                      </th>
                      <th className="py-4 px-4 text-right font-semibold text-[#b0aea5] text-sm uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position) => (
                      <tr
                        key={position.symbol}
                        className="table-row group"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#faf9f5]/5 p-2 
                                          group-hover:bg-[#faf9f5]/10 transition-colors">
                              <Image
                                src={position.logo || "/placeholder.svg"}
                                alt={position.company}
                                width={24}
                                height={24}
                                className="object-contain"
                              />
                            </div>
                            <a
                              href={`https://www.google.com/finance/quote/${position.symbol}:${stockExchanges[position.symbol] || 'NASDAQ'}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#faf9f5] hover:text-[#d97757] transition-colors font-medium"
                            >
                              {position.company}
                            </a>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-[#b0aea5]">{position.symbol}</span>
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-[#faf9f5]">
                          ${position.price.toFixed(2)}
                        </td>
                        <td className={`py-4 px-4 text-right font-mono font-medium ${position.change >= 0 ? "text-[#4ade80]" : "text-[#f87171]"
                          }`}>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm
                            ${position.change >= 0
                              ? "bg-[#4ade80]/10"
                              : "bg-[#f87171]/10"
                            }`}
                          >
                            {position.change >= 0 ? "↑" : "↓"}
                            {Math.abs(position.change).toFixed(2)}%
                          </span>
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
