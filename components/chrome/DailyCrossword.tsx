"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, Puzzle, Save, Trophy, X } from "lucide-react";

interface LeaderboardEntry {
  id: number;
  player_name: string;
  score: number;
  puzzle_date: string;
  puzzle_number?: string | null;
  puzzle_title?: string | null;
  completed_at: string;
}

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseBoatloadDate(value: string) {
  const match = value.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\b/);

  if (!match) return null;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const rawYear = Number(match[3]);
  const year = rawYear < 100 ? 2000 + rawYear : rawYear;

  if (!month || !day || month > 12 || day > 31) return null;

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parsePuzzleMetadata(text: string) {
  const title = text.match(/Crossword\s+(\d+)\s+\(([^)]+)\)/i);

  if (!title) {
    return {
      puzzleNumber: null,
      puzzleTitle: null,
      puzzleDate: null,
    };
  }

  return {
    puzzleNumber: title[1],
    puzzleTitle: title[0],
    puzzleDate: parseBoatloadDate(title[2]),
  };
}

function parseCrosswordText(text: string) {
  const scoreMatch = text.match(/Score:\s*(\d+)/i);
  const puzzleMetadata = parsePuzzleMetadata(text);

  return {
    score: scoreMatch ? Number(scoreMatch[1]) : null,
    isComplete: /Puzzle complete!/i.test(text),
    ...puzzleMetadata,
  };
}

export default function DailyCrossword() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardStatus, setLeaderboardStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [leaderboardMessage, setLeaderboardMessage] = useState("");
  const [playerName, setPlayerName] = useState("Guest");
  const [detectedScore, setDetectedScore] = useState<number | null>(null);
  const [scoreInput, setScoreInput] = useState("");
  const [detectedPuzzleDate, setDetectedPuzzleDate] = useState<string | null>(null);
  const [detectedPuzzleNumber, setDetectedPuzzleNumber] = useState<string | null>(null);
  const [detectedPuzzleTitle, setDetectedPuzzleTitle] = useState<string | null>(null);
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastDetectedScoreRef = useRef<number | null>(null);
  const fallbackPuzzleDate = formatLocalDate(new Date());
  const puzzleDate = detectedPuzzleDate ?? fallbackPuzzleDate;

  function applyDetectedCrosswordText(text: string) {
    const detected = parseCrosswordText(text);

    if (detected.score !== null) {
      const previousScore = lastDetectedScoreRef.current;
      lastDetectedScoreRef.current = detected.score;

      setDetectedScore(detected.score);
      setScoreInput((current) => (current === "" || current === String(previousScore) ? String(detected.score) : current));
    }

    if (detected.puzzleDate) {
      setDetectedPuzzleDate(detected.puzzleDate);
    }

    if (detected.puzzleNumber) {
      setDetectedPuzzleNumber(detected.puzzleNumber);
    }

    if (detected.puzzleTitle) {
      setDetectedPuzzleTitle(detected.puzzleTitle);
    }

    setIsPuzzleComplete(detected.isComplete);
  }

  useEffect(() => {
    function handleCrosswordMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (!event.data || event.data.type !== "daily-crossword-state" || typeof event.data.text !== "string") return;

      applyDetectedCrosswordText(event.data.text);
    }

    window.addEventListener("message", handleCrosswordMessage);
    return () => window.removeEventListener("message", handleCrosswordMessage);
  }, []);

  useEffect(() => {
    if (!hasOpened) return;

    const intervalId = window.setInterval(() => {
      try {
        const bodyText = iframeRef.current?.contentDocument?.body?.innerText ?? "";
        applyDetectedCrosswordText(bodyText);
      } catch {
        // The crossword is served through our route today, but keep the UI usable if the embed changes.
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [hasOpened]);

  async function loadLeaderboard() {
    setLeaderboardStatus("loading");
    setLeaderboardMessage("");

    try {
      const response = await fetch(`/api/crossword/leaderboard?puzzleDate=${puzzleDate}`, {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to load leaderboard");
      }

      setLeaderboard(payload.entries ?? []);
      if (payload.needsSetup) {
        setLeaderboardMessage("Leaderboard table needs setup before scores can be saved.");
      } else if (payload.configured === false) {
        setLeaderboardMessage("Leaderboard database is not configured yet.");
      }
      setLeaderboardStatus("ready");
    } catch (error) {
      setLeaderboardStatus("error");
      setLeaderboardMessage(error instanceof Error ? error.message : "Unable to load leaderboard");
    }
  }

  function toggleCrossword() {
    setHasOpened(true);
    setIsOpen((current) => !current);
  }

  function toggleLeaderboard() {
    const nextState = !isLeaderboardOpen;
    setIsLeaderboardOpen(nextState);

    if (nextState && leaderboardStatus === "idle") {
      loadLeaderboard();
    }
  }

  async function saveScore() {
    const score = Number(scoreInput);

    if (!Number.isFinite(score) || score < 0) {
      setSaveStatus("error");
      setLeaderboardMessage("Enter a valid score before saving.");
      return;
    }

    setSaveStatus("saving");
    setLeaderboardMessage("");

    try {
      const response = await fetch("/api/crossword/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          score,
          puzzleDate,
          puzzleNumber: detectedPuzzleNumber,
          puzzleTitle: detectedPuzzleTitle,
          completedAt: new Date().toISOString(),
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to save score");
      }

      setSaveStatus("saved");
      setLeaderboardMessage("Score saved.");
      setLeaderboard((current) =>
        [payload.entry, ...current]
          .filter(Boolean)
          .sort((a, b) => a.score - b.score || new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime())
          .slice(0, 10),
      );
      setLeaderboardStatus("ready");
    } catch (error) {
      setSaveStatus("error");
      setLeaderboardMessage(error instanceof Error ? error.message : "Unable to save score");
    }
  }

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
          onClick={toggleCrossword}
        >
          {isOpen ? <X size={16} aria-hidden="true" /> : <Puzzle size={16} aria-hidden="true" />}
          {isOpen ? "Hide crossword" : "Play today's crossword"}
        </button>
      </div>

      {hasOpened && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <button
              type="button"
              className="btn btn-o"
              aria-expanded={isLeaderboardOpen}
              aria-controls="daily-crossword-leaderboard"
              onClick={toggleLeaderboard}
              style={{ paddingInline: 18 }}
            >
              <Trophy size={16} aria-hidden="true" />
              Leaderboard
              <ChevronDown
                size={15}
                aria-hidden="true"
                style={{
                  transform: isLeaderboardOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .2s ease",
                }}
              />
            </button>
          </div>

          {isLeaderboardOpen && (
            <div
              id="daily-crossword-leaderboard"
              style={{
                marginTop: 14,
                padding: 18,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.1)",
                background: "rgba(8,8,7,.54)",
                boxShadow: "0 18px 48px rgba(0,0,0,.26)",
                opacity: 0,
                animation: "fadeUp .35s ease both",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: 10,
                  alignItems: "end",
                }}
              >
                <label style={{ display: "grid", gap: 6, color: "#b0aea5", fontSize: ".78rem" }}>
                  Name
                  <input
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    maxLength={40}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,.13)",
                      background: "rgba(255,255,255,.05)",
                      color: "#faf9f5",
                      padding: "9px 10px",
                    }}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, color: "#b0aea5", fontSize: ".78rem" }}>
                  Score
                  <input
                    value={scoreInput}
                    onChange={(event) => setScoreInput(event.target.value)}
                    inputMode="numeric"
                    placeholder={detectedScore === null ? "Score" : String(detectedScore)}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,.13)",
                      background: "rgba(255,255,255,.05)",
                      color: "#faf9f5",
                      padding: "9px 10px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  />
                </label>
                <label style={{ display: "grid", gap: 6, color: "#b0aea5", fontSize: ".78rem" }}>
                  Puzzle date
                  <span
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,.13)",
                      background: "rgba(255,255,255,.05)",
                      color: "#faf9f5",
                      padding: "9px 10px",
                      minHeight: 43,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {puzzleDate}
                  </span>
                </label>
                <button
                  type="button"
                  className="btn btn-p"
                  onClick={saveScore}
                  disabled={saveStatus === "saving"}
                  style={{ justifyContent: "center", paddingInline: 16 }}
                >
                  {saveStatus === "saving" ? <Loader2 size={15} aria-hidden="true" /> : <Save size={15} aria-hidden="true" />}
                  Save
                </button>
              </div>

              <p style={{ margin: "12px 0 0", color: isPuzzleComplete ? "#4ade80" : "#b0aea5", fontSize: ".82rem" }}>
                {detectedScore === null
                  ? "The puzzle date is saved automatically; enter the visible score if browser iframe access is blocked."
                  : `${isPuzzleComplete ? "Completed" : "Current"} score: ${detectedScore}${
                      detectedPuzzleTitle ? ` from ${detectedPuzzleTitle}` : ""
                    }`}
              </p>

              {leaderboardMessage && (
                <p
                  role="status"
                  style={{
                    margin: "8px 0 0",
                    color: saveStatus === "error" || leaderboardStatus === "error" ? "#f87171" : "#b0aea5",
                    fontSize: ".82rem",
                  }}
                >
                  {leaderboardMessage}
                </p>
              )}

              <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                {leaderboardStatus === "loading" && <p style={{ color: "#b0aea5", margin: 0 }}>Loading leaderboard...</p>}
                {leaderboardStatus === "ready" && leaderboard.length === 0 && (
                  <p style={{ color: "#b0aea5", margin: 0 }}>No scores saved for today yet.</p>
                )}
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1fr auto",
                      gap: 10,
                      alignItems: "center",
                      padding: "9px 10px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,.045)",
                      color: "#faf9f5",
                      fontSize: ".88rem",
                    }}
                  >
                    <span style={{ color: "#d97757", fontVariantNumeric: "tabular-nums" }}>{index + 1}</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.player_name}</span>
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: isOpen ? "block" : "none",
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
              ref={iframeRef}
              id="daily-crossword-frame"
              title="Today's crossword puzzle"
              src="/api/crossword?bridge=1"
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
        </>
      )}
    </div>
  );
}
