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
    id: 8,
    title: "On the Greats",
    excerpt: "Lebron",
    content: `Becoming great is hard, it requires more than just discipline and consistency. 
    
    It requires competitiveness. You have to wake up everyday and keep going no matter how far you've come or how far ahead of the competition you are.
    Lebron is the undisputed great but hes still grinding daily to make it unanimous -- why aren't you??`,
    date: "2025-04-06",
  },
  {
    id: 7,
    title: "Growth and Consistency",
    excerpt: "working hard",
    content: `Consistency is key to growth, with consistency you need dicipline and the right frame and mindset. 
    Always think positive.
    
    Change what you can change, ignore what you can't.
    Closed mouths do not get fed. Opportunities do not fall off trees. 
    Stay hungry, stay focused, stay active.`,
    date: "2025-04-08",
  },
  {
    id: 6,
    title: "AI Agents",
    excerpt: "automating my workflow",
    content: `working on creating an organization with trying to automate everything I can to max my efficiency.
    That way I can work when I am not at my computer, (or even sleeping?)`,
    date: "2025-04-06",
  },
  {
    id: 5,
    title: "Inspiration to the Hackathon Project",
    excerpt: "Why I Built the Healthcare Chatbot",
    content: `When I was in middle school, I slipped while running on hardwood floors in socks — the classic mistake. The result? A painful contusion on my knee. I couldn’t move it without sharp pain, and my parents and I feared the worst. We rushed to the ER, got X-rays, and were eventually told it wasn’t serious — just some rest, crutches, and a brace would do the trick.

The hospital bill? $3,000.

It was an expensive lesson: sometimes, what feels urgent might not be serious — but in the moment, there’s no easy way to know that.

Fast forward to last week, my friend was telling me about a Whoop report showing his HRV (Heart Rate Variability) was way off. He wasn’t sleeping — just lying awake for hours in bed — and his numbers looked abnormal. It made me wonder: what if this actually is something serious? What kind of help should he seek, and when?

That contrast — my unnecessary ER visit versus my friend’s subtle but possibly important signal — made me realize how inefficient and reactive our healthcare system is.

So I built this project.

I wanted to create a tool that empowers patients to better understand their symptoms before spending thousands or waiting days for a reply from a provider. A tool that bridges the gap between data (like biometrics) and context (like symptoms), and offers guidance without overloading the healthcare system.

This isn't just code. It's a response to real, lived inefficiencies — and my way of helping make healthcare more accessible, affordable, and informed for everyone.`,
    date: "2025-03-31",
  },
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

