"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/chrome/PageHero";
import { projects, type Project } from "@/lib/projects";

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

function ProjectCardInner({ p }: { p: Project }) {
  return (
    <>
      <div style={{ position: "relative", height: 210, background: "#0f0f0e", overflow: "hidden" }}>
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
              "linear-gradient(to top,rgba(7,7,6,.95) 0%,rgba(7,7,6,.4) 55%,transparent 100%)",
          }}
        />
        <span className="bd" style={{ position: "absolute", top: 12, right: 12 }}>
          {p.date}
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          {p.tags.map((t) => (
            <span key={t} className="ba" style={{ fontSize: ".64rem" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <h2 style={{ fontSize: "1.02rem", fontWeight: 600, color: "#faf9f5", marginBottom: 8 }}>
          {p.title}
        </h2>
        <p
          style={{
            color: "rgba(176,174,165,.76)",
            fontSize: ".84rem",
            lineHeight: 1.65,
            fontFamily: "var(--font-lora), Georgia, serif",
            marginBottom: 14,
          }}
        >
          {p.description}
        </p>
        <span
          style={{
            color: "#d97757",
            fontSize: ".8rem",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Explore Project <Arrow />
        </span>
      </div>
    </>
  );
}

export default function ProjectsPage() {
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const sorted = [...projects].sort((a, b) => {
    const d = (s: string) => new Date(s + " 1").getTime();
    return sort === "newest" ? d(b.date) - d(a.date) : d(a.date) - d(b.date);
  });

  return (
    <div>
      <PageHero
        eyebrow="Work"
        title="Projects"
        subtitle="Fintech, AI, and full-stack engineering."
        minH="42vh"
      />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 28px 80px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
          {(["newest", "oldest"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                padding: "5px 16px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: sort === s ? "rgba(217,119,87,.45)" : "rgba(255,255,255,.09)",
                background: sort === s ? "rgba(217,119,87,.1)" : "transparent",
                color: sort === s ? "#d97757" : "rgba(176,174,165,.65)",
                fontSize: ".75rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all .2s",
                fontFamily: "inherit",
                letterSpacing: ".04em",
              }}
            >
              {s === "newest" ? "↓ Newest first" : "↑ Oldest first"}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,470px),1fr))",
            gap: 24,
          }}
        >
          {sorted.map((p, i) => {
            const isExternal = p.link.startsWith("http");
            const cardStyle = {
              overflow: "hidden",
              cursor: "pointer",
              opacity: 0,
              animation: "fadeUp .5s ease both",
              animationDelay: `${i * 0.07}s`,
              color: "inherit",
              display: "block",
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
                <ProjectCardInner p={p} />
              </a>
            ) : (
              <Link key={p.id} href={p.link} className="gc" style={cardStyle}>
                <ProjectCardInner p={p} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
