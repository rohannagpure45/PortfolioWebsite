import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// Import the "Inter" font for a modern look.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rohan Nagpure - Portfolio",
  description: "Personal portfolio and financial blog of Rohan Nagpure",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 
          Switched to a light background and dark text for an Apple-like clean design.
          Also, added a container class to center page content.
      */}
      <body className={`${inter.className} bg-white text-black min-h-screen`}>
        {/* Header with a translucent white background, a subtle shadow, and centered content */}
        <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Rohan Nagpure
              </Link>
              <div className="space-x-6">
                <Link
                  href="/projects"
                  className="hover:text-blue-500 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-blue-500 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="hover:text-blue-500 transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        {/* 
            Main content is centered using container classes and padded at the top 
            to avoid overlapping the fixed header.
        */}
        <main className="pt-20 container mx-auto">{children}</main>
        {/* 
            Footer with a subtle border and light text to maintain minimalism.
        */}
        <footer className="bg-white/80 backdrop-blur-md mt-20 py-6 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Rohan Nagpure. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
