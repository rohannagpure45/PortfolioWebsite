"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/chrome/PageHero";
import { getBlogPosts } from "@/lib/supabaseClient";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
}

function Arrow() {
  return (
    <svg
      style={{ width: 13, height: 13, flexShrink: 0 }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load blog posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Writing"
        title="Blog"
        subtitle="Finance, engineering, and the things in between."
        minH="38vh"
      />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "44px 28px 80px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
          <a
            href="/api/rss"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#d97757",
              fontSize: ".75rem",
              fontWeight: 500,
            }}
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
            </svg>
            Subscribe via RSS
          </a>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(176,174,165,.6)" }}>
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
            <p style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>Loading posts…</p>
          </div>
        )}

        {error && (
          <div
            className="gc"
            style={{
              padding: "20px 24px",
              textAlign: "center",
              color: "#f87171",
              borderColor: "rgba(248,113,113,.25)",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div
            className="gc"
            style={{
              padding: "32px 24px",
              textAlign: "center",
              color: "rgba(176,174,165,.6)",
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            No posts yet — check back soon.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map((p, i) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="gc"
              style={{
                padding: "22px 28px",
                cursor: "pointer",
                opacity: 0,
                animation: "fadeUp .5s ease both",
                animationDelay: `${i * 0.05}s`,
                color: "inherit",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 14,
                  marginBottom: 10,
                }}
              >
                <h2
                  style={{
                    fontSize: ".98rem",
                    fontWeight: 600,
                    color: "#faf9f5",
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {p.title}
                </h2>
                <span className="bd" style={{ flexShrink: 0 }}>
                  {p.date}
                </span>
              </div>
              <p
                style={{
                  color: "rgba(176,174,165,.74)",
                  fontSize: ".86rem",
                  lineHeight: 1.68,
                  fontFamily: "var(--font-lora), Georgia, serif",
                  marginBottom: 14,
                }}
              >
                {p.excerpt}
              </p>
              <span
                style={{
                  color: "#d97757",
                  fontSize: ".8rem",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                Read more <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
