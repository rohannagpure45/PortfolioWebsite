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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Blog</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Where I share insights about financial markets, technology trends, and the intersection
            of computer science and finance.
          </p>
        </div>
      </section>

      {/* Main Blog Content */}
      <div className="container mx-auto px-4 flex-grow">
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts found.</p>
          </div>
        )}

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Post Heading */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => togglePost(post.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <button className="text-blue-600 hover:text-blue-500 transition-colors">
                  {expandedPost === post.id ? "Show less" : "Read more"}
                </button>
              </div>
              {/* Expanded Content */}
              {expandedPost === post.id && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-4 prose max-w-none text-gray-700">
                    {post.content.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
