"use client";

import { useState } from "react";
import { Puzzle, X } from "lucide-react";

export default function DailyCrossword() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="gc"
      style={{
        padding: "26px 32px",
        opacity: 0,
        animation: "fadeUp .6s ease both",
        animationDelay: ".25s",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 22,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <p className="eyebrow" style={{ marginBottom: 5 }}>
            Daily Crossword
          </p>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#faf9f5" }}>Today&apos;s puzzle</h2>
        </div>
        <button
          type="button"
          className={isOpen ? "btn btn-o" : "btn btn-p"}
          aria-expanded={isOpen}
          aria-controls="daily-crossword-frame"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={16} aria-hidden="true" /> : <Puzzle size={16} aria-hidden="true" />}
          {isOpen ? "Hide crossword" : "Play today's crossword"}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: 20,
            overflow: "hidden",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,.1)",
            boxShadow: "0 18px 48px rgba(0,0,0,.42)",
            opacity: 0,
            animation: "fadeUp .45s ease both",
          }}
        >
          <iframe
            id="daily-crossword-frame"
            title="Today's crossword puzzle"
            src="/api/crossword"
            referrerPolicy="no-referrer"
            style={{
              width: "min(100%, 620px)",
              height: 480,
              margin: "0 auto",
              display: "block",
              border: 0,
              background: "#f7f3ea",
            }}
          />
        </div>
      )}
    </div>
  );
}
