import type { Metadata } from "next";
import { Poppins, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ChromeShader from "@/components/chrome/ChromeShader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohan Nagpure",
  description: "Personal portfolio and financial blog of Rohan Nagpure",
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/api/rss", title: "Rohan Nagpure - Blog RSS Feed" }],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${lora.variable} ${jetbrains.variable}`}
    >
      <body className={poppins.className}>
        <ChromeShader />

        <header className="nav">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              Rohan Nagpure
            </Link>
            <nav className="nav-links">
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
              <Link href="/portfolio" className="nav-link">Portfolio</Link>
              <Link href="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>

        <main style={{ position: "relative", zIndex: 1, paddingTop: 60, minHeight: "100vh" }}>
          {children}
        </main>

        <footer
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,.06)",
            padding: "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <p style={{ color: "rgba(176,174,165,.38)", fontSize: ".76rem" }}>
            © 2025 Rohan Nagpure · All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <a
              href="https://linkedin.com/in/rohan-nagpure/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-animated"
              style={{ fontSize: ".76rem" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rohannagpure45"
              target="_blank"
              rel="noopener noreferrer"
              className="link-animated"
              style={{ fontSize: ".76rem" }}
            >
              GitHub
            </a>
            <a
              href="mailto:rohannagpure23@gmail.com"
              className="link-animated"
              style={{ fontSize: ".76rem" }}
            >
              Email
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
