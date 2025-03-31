import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rohan Nagpure - Portfolio",
  description: "Personal portfolio and financial blog of Rohan Nagpure",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen`}>
        <header className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Rohan Nagpure
              </Link>
              <div className="space-x-6">
                <Link href="/projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </Link>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
        <footer className="bg-gray-900/80 backdrop-blur-md mt-20 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Rohan Nagpure. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'