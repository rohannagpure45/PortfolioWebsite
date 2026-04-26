"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/chrome/PageHero";
import GlassCard from "@/components/chrome/GlassCard";

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
  MU: "https://cdn.freebiesupply.com/logos/thumbs/2x/micron-technology-logo.png",
  TSM: "https://cdn.freebiesupply.com/logos/thumbs/2x/tsmc-logo.png",
};

const stockExchanges: Record<string, string> = {
  GS: "NYSE",
  TSM: "NYSE",
};

export default function Portfolio() {
  const [positions, setPositions] = useState<StockPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/stocks");
        if (!res.ok) throw new Error("Failed to fetch stock data");
        const data: StockPosition[] = await res.json();
        setPositions(
          data.map((s) => ({ ...s, logo: companyLogos[s.symbol] || "/placeholder.svg" }))
        );
      } catch {
        setError("Failed to load stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Holdings"
        title="Investment Portfolio"
        subtitle="Long-term positions in the names I track most closely."
        minH="38vh"
      />

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 28px 80px" }}>
        <GlassCard style={{ padding: "28px 30px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 28,
                  border: "2px solid #d97757",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: 12,
                }}
              />
              <p
                style={{
                  color: "rgba(176,174,165,.7)",
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Loading market data…
              </p>
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
                color: "#f87171",
              }}
            >
              {error}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(176,174,165,.12)" }}>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontSize: ".7rem",
                        fontWeight: 600,
                        color: "rgba(176,174,165,.7)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      Company
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontSize: ".7rem",
                        fontWeight: 600,
                        color: "rgba(176,174,165,.7)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      Symbol
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "right",
                        fontSize: ".7rem",
                        fontWeight: 600,
                        color: "rgba(176,174,165,.7)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "right",
                        fontSize: ".7rem",
                        fontWeight: 600,
                        color: "rgba(176,174,165,.7)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((p) => {
                    const up = p.change >= 0;
                    return (
                      <tr key={p.symbol} className="table-row">
                        <td style={{ padding: "14px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                background: "rgba(255,255,255,.04)",
                                borderRadius: 8,
                                padding: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                src={p.logo || "/placeholder.svg"}
                                alt={p.company}
                                width={24}
                                height={24}
                                style={{ width: "auto", height: "auto", objectFit: "contain" }}
                              />
                            </div>
                            <a
                              href={`https://www.google.com/finance/quote/${p.symbol}:${stockExchanges[p.symbol] || "NASDAQ"}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#faf9f5",
                                fontWeight: 500,
                                transition: "color .2s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#d97757")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "#faf9f5")}
                            >
                              {p.company}
                            </a>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "14px 12px",
                            fontFamily: "var(--font-mono), monospace",
                            color: "rgba(176,174,165,.8)",
                            fontSize: ".85rem",
                          }}
                        >
                          {p.symbol}
                        </td>
                        <td
                          style={{
                            padding: "14px 12px",
                            textAlign: "right",
                            fontFamily: "var(--font-mono), monospace",
                            color: "#faf9f5",
                            fontSize: ".88rem",
                          }}
                        >
                          ${p.price.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px 12px", textAlign: "right" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "3px 10px",
                              borderRadius: 999,
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: ".78rem",
                              fontWeight: 500,
                              background: up ? "rgba(74,222,128,.1)" : "rgba(248,113,113,.1)",
                              color: up ? "#4ade80" : "#f87171",
                              border: `1px solid ${up ? "rgba(74,222,128,.2)" : "rgba(248,113,113,.2)"}`,
                            }}
                          >
                            {up ? "↑" : "↓"} {Math.abs(p.change).toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>

        <p
          style={{
            marginTop: 18,
            color: "rgba(176,174,165,.5)",
            fontSize: ".78rem",
            fontFamily: "var(--font-lora), Georgia, serif",
            textAlign: "center",
          }}
        >
          Prices cached for up to 4 hours. Data via Alpha Vantage.
        </p>
      </div>
    </div>
  );
}
