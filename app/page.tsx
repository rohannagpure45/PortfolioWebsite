"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StreamText from "@/components/chrome/StreamText";
import GlassCard from "@/components/chrome/GlassCard";
import DailyCrossword from "@/components/chrome/DailyCrossword";
import { projects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/supabaseClient";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

function Arrow() {
  return (
    <svg
      style={{ width: 15, height: 15, flexShrink: 0 }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then((posts) => setRecentPosts(posts.slice(0, 2)));
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(30,28,26,0) 0%, rgba(8,8,7,.72) 65%, rgba(6,6,5,.97) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 45% at 50% 36%, rgba(80,68,58,.18) 0%, transparent 70%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: 820,
            marginTop: 60,
          }}
        >
          <StreamText
            text="Computer Science · Business · Fintech"
            as="p"
            baseDelay={0.1}
            charDelay={0.034}
            style={{
              fontSize: ".68rem",
              fontWeight: 500,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "rgba(217,119,87,.88)",
              marginBottom: 30,
            }}
          />

          <StreamText
            text="Building the Future of Finance"
            as="h1"
            baseDelay={0.45}
            charDelay={0.034}
            style={{
              fontSize: "clamp(2.8rem,6.5vw,5.2rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#faf9f5",
              marginBottom: 28,
            }}
          />

          <div style={{ opacity: 0, animation: "fadeUp .7s ease both", animationDelay: "1.45s" }}>
            <p
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "1.05rem",
                lineHeight: 1.78,
                color: "rgba(176,174,165,.82)",
                maxWidth: 520,
                margin: "0 auto 40px",
              }}
            >
              Northeastern University student building innovative solutions at the intersection of
              technology and finance.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/projects" className="btn btn-p">
                View Projects <Arrow />
              </Link>
              <Link href="/about" className="btn btn-o">
                About Me
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            opacity: 0,
            animation: "fadeUp .5s ease both",
            animationDelay: "1.9s",
          }}
        >
          <div
            style={{
              width: 22,
              height: 36,
              borderRadius: 11,
              border: "1.5px solid rgba(176,174,165,.22)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 7,
            }}
          >
            <div style={{ width: 3, height: 7, borderRadius: 2, background: "rgba(176,174,165,.4)" }} />
          </div>
        </div>
      </section>

      {/* CONSULTING CARD */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
        <GlassCard
          style={{
            padding: "26px 32px",
            opacity: 0,
            animation: "fadeUp .6s ease both",
            animationDelay: ".2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div
              style={{
                width: 3,
                minHeight: 52,
                background: "linear-gradient(180deg,#d97757,rgba(217,119,87,.15))",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <p className="eyebrow" style={{ marginBottom: 5 }}>
                Software Consulting
              </p>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#faf9f5", marginBottom: 5 }}>
                Unbounded Scaling LLC
              </h3>
              <p
                style={{
                  color: "rgba(176,174,165,.72)",
                  fontSize: ".85rem",
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Custom software solutions, built right. From MVPs to production-ready applications.
              </p>
            </div>
            <a
              href="mailto:rohannagpure23@gmail.com"
              className="btn btn-o"
              style={{ flexShrink: 0 }}
            >
              Get in touch
            </a>
          </div>
        </GlassCard>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ maxWidth: 1100, margin: "56px auto 0", padding: "0 28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <p className="eyebrow">Selected Work</p>
          <Link
            href="/projects"
            style={{
              color: "#d97757",
              fontSize: ".8rem",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            All projects <Arrow />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,310px),1fr))",
            gap: 20,
          }}
        >
          {featured.map((p, i) => {
            const isExternal = p.link.startsWith("http");
            const inner = (
              <>
                <div style={{ position: "relative", height: 180, background: "#111", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .5s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(7,7,6,.95) 0%,rgba(7,7,6,.35) 55%,transparent 100%)",
                    }}
                  />
                  <span className="bd" style={{ position: "absolute", top: 10, right: 10 }}>
                    {p.date}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      display: "flex",
                      gap: 5,
                      flexWrap: "wrap",
                    }}
                  >
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="ba" style={{ fontSize: ".62rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <h2 style={{ fontSize: ".98rem", fontWeight: 600, color: "#faf9f5", marginBottom: 6 }}>
                    {p.title}
                  </h2>
                  <p
                    style={{
                      color: "rgba(176,174,165,.75)",
                      fontSize: ".8rem",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-lora), Georgia, serif",
                      marginBottom: 12,
                    }}
                  >
                    {p.description.slice(0, 100)}…
                  </p>
                  <span style={{ color: "#d97757", fontSize: ".78rem", fontWeight: 500 }}>Explore →</span>
                </div>
              </>
            );
            const cardStyle = {
              overflow: "hidden",
              opacity: 0,
              animation: "fadeUp .5s ease both",
              animationDelay: `${0.1 + i * 0.1}s`,
              cursor: "pointer",
              display: "block",
              color: "inherit",
            } as const;
            return isExternal ? (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gc"
                style={cardStyle}
              >
                {inner}
              </a>
            ) : (
              <Link key={p.id} href={p.link} className="gc" style={cardStyle}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* RECENT WRITING */}
      <section style={{ maxWidth: 1100, margin: "56px auto 0", padding: "0 28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <p className="eyebrow">Recent Writing</p>
          <Link
            href="/blog"
            style={{
              color: "#d97757",
              fontSize: ".8rem",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            All posts <Arrow />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))",
            gap: 16,
          }}
        >
          {recentPosts.map((p, i) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="gc"
              style={{
                padding: "22px 26px",
                cursor: "pointer",
                opacity: 0,
                animation: "fadeUp .5s ease both",
                animationDelay: `${0.15 + i * 0.1}s`,
                color: "inherit",
                display: "block",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <span className="bd">{p.date}</span>
              </div>
              <h3
                style={{
                  fontSize: ".95rem",
                  fontWeight: 600,
                  color: "#faf9f5",
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "rgba(176,174,165,.72)",
                  fontSize: ".82rem",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-lora), Georgia, serif",
                  marginBottom: 12,
                }}
              >
                {p.excerpt.slice(0, 110)}…
              </p>
              <span style={{ color: "#d97757", fontSize: ".78rem", fontWeight: 500 }}>Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* DAILY CROSSWORD */}
      <section style={{ maxWidth: 1100, margin: "56px auto 0", padding: "0 28px" }}>
        <DailyCrossword />
      </section>

      <div style={{ height: 80 }} />
    </div>
  );
}
