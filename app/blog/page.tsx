"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/supabaseClient";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError("Failed to load blog posts");
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center hero-gradient">
        <div className="accent-glow bottom-0 right-0 opacity-50" />

        <div className="relative z-10 text-center px-6 stagger-children">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#faf9f5]">
            My Blog
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#b0aea5]">
            Insights about financial markets, technology trends, and the
            intersection of computer science and finance.
          </p>

          {/* RSS Feed Link */}
          <a
            href="/api/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-[#d97757] hover:underline text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
            </svg>
            Subscribe via RSS
          </a>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-[#d97757] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#b0aea5]">Loading blog posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 card bg-[#f87171]/5 border-[#f87171]/20">
              <p className="text-[#f87171]">{error}</p>
            </div>
          )}

          {!loading && !error && blogPosts.length === 0 && (
            <div className="text-center py-16 card-elevated">
              <p className="text-[#b0aea5]">No blog posts found.</p>
              <p className="text-[#b0aea5]/60 text-sm mt-2">Check back soon for new content!</p>
            </div>
          )}

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="card-elevated overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-[#d97757]/30"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-[#faf9f5] group-hover:text-[#d97757] transition-colors">
                      {post.title}
                    </h2>
                    <span className="text-[#b0aea5]/60 text-sm whitespace-nowrap ml-4">
                      {post.date}
                    </span>
                  </div>
                  <p className="text-[#b0aea5] mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-[#d97757] font-medium inline-flex items-center gap-2 
                                   group-hover:gap-3 transition-all">
                    Read more
                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
