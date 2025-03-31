"use client"

import { useState } from "react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    id: 4,
    title: "First post",
    excerpt: "Marketing Lessons: Nike",
    content: `Nike is exceptional at marketing, They are endorsed by a ton of influencers and athletes. The swoosh lives without the name.
    

    Nike was been around since 1964 and is one of the most recognizable brand. They spend a lot of time and money on legal fees to defend and protect their brand.

    They grossed $51 billion last year. In a market with competeitors like Puma, Adidas, Under Armor, and North Face, Patagonia, Reebok, Eddie Bauer.

    There are different levels of product targeting different market segments. They make ultra expensive soccer cleats for high performance athletes but also lounge/leisurewear for everyday people.

    A company misson is what the companies objectives and goals are. Goals can change but the mission remains long term.

    A companies portfolio has to align with their objectives and goals so that they can achieve their mission to be successful.`,
    date: "2025-01-15",
  },
  {
    id: 1,
    title: "Understanding Market Volatility",
    excerpt: "Exploring the factors that drive market fluctuations and strategies to navigate volatile periods.",
    content: `Market volatility is a natural part of investing...`,
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "The Rise of ESG Investing",
    excerpt: "Analysis of how Environmental, Social, and Governance factors are reshaping investment strategies.",
    content: `ESG investing has become increasingly important...`,
    date: "2023-06-02",
  },
  {
    id: 3,
    title: "Cryptocurrency: A New Asset Class?",
    excerpt: "Examining the role of cryptocurrencies in modern investment portfolios.",
    content: `As cryptocurrencies continue to evolve...`,
    date: "2023-06-20",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function Blog() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const togglePost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">My Blog</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-center text-gray-300">
            Welcome to my blog where I share insights about financial markets, technology trends, and the intersection
            of computer science and finance. Here you'll find analysis of market movements, deep dives into fintech
            innovations, and perspectives on emerging technologies.
          </p>
        </div>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div
                className="p-6 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => togglePost(post.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  {expandedPost === post.id ? "Show less" : "Read more"}
                </button>
              </div>
              {expandedPost === post.id && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-700 pt-4">
                    <div className="prose prose-invert max-w-none">
                      {post.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

