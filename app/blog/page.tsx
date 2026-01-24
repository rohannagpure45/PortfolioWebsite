"use client";

import { useState, useEffect } from "react";
import { getBlogPosts } from "@/lib/supabaseClient";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export default function Blog() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
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

  const togglePost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

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
                className={`card-elevated overflow-hidden transition-all duration-300
                           ${expandedPost === post.id ? 'ring-1 ring-[#d97757]/30' : ''}`}
              >
                {/* Post Header */}
                <button
                  type="button"
                  className="w-full text-left p-6 cursor-pointer group"
                  onClick={() => togglePost(post.id)}
                  aria-expanded={expandedPost === post.id}
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
                    {expandedPost === post.id ? (
                      <>
                        Show less
                        <svg className="w-4 h-4 rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read more
                        <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                              ${expandedPost === post.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 border-t border-[#b0aea5]/10">
                    <div className="pt-6 prose max-w-none">
                      {post.content.split("\n").map((paragraph, idx) => (
                        paragraph.trim() && (
                          <p key={idx} className="text-[#b0aea5] mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
