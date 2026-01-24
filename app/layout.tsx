import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// Premium geometric sans-serif for headings and UI
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Rohan Nagpure - Portfolio",
  description: "Personal portfolio and financial blog of Rohan Nagpure",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} min-h-screen`}>
        {/* Clean header */}
        <header className="fixed w-full z-50 bg-[#141413]/90 backdrop-blur-md border-b border-[#b0aea5]/10">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-semibold text-[#d97757] hover:opacity-80 transition-opacity"
              >
                Rohan Nagpure
              </Link>

              {/* Navigation links */}
              <div className="flex items-center space-x-8">
                <Link href="/projects" className="nav-link">
                  Projects
                </Link>
                <Link href="/blog" className="nav-link">
                  Blog
                </Link>
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="pt-16 min-h-screen">{children}</main>

        {/* Minimal footer */}
        <footer className="border-t border-[#b0aea5]/10 py-8 mt-20">
          <div className="container mx-auto px-6 text-center">
            <p className="text-[#b0aea5] text-sm">
              © 2025 Rohan Nagpure. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
