import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

interface CrosswordLeaderboardEntry {
  id: number;
  player_name: string;
  score: number;
  puzzle_date: string;
  puzzle_number?: string | null;
  puzzle_title?: string | null;
  completed_at: string;
  created_at?: string;
}

const SELECT_COLUMNS = "id, player_name, score, puzzle_date, puzzle_number, puzzle_title, completed_at, created_at";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function isDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function sanitizePlayerName(value: unknown) {
  if (typeof value !== "string") return "Guest";

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 40) : "Guest";
}

function parseScore(value: unknown) {
  const score = Number(value);

  if (!Number.isFinite(score) || score < 0) {
    return null;
  }

  return Math.round(score);
}

function sanitizeOptionalText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function isMissingTableError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "PGRST205"
  );
}

export async function GET(request: Request) {
  if (!supabase) {
    return NextResponse.json({ entries: [], configured: false });
  }

  const { searchParams } = new URL(request.url);
  const requestedLimit = Number(searchParams.get("limit") ?? 10);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(Math.round(requestedLimit), 1), 50) : 10;
  const puzzleDate = searchParams.get("puzzleDate");

  try {
    let query = supabase
      .from("crossword_leaderboard")
      .select(SELECT_COLUMNS);

    if (puzzleDate && isDateString(puzzleDate)) {
      query = query.eq("puzzle_date", puzzleDate);
    }

    const { data, error } = await query
      .order("score", { ascending: true })
      .order("completed_at", { ascending: true })
      .limit(limit);

    if (error) {
      if (isMissingTableError(error)) {
        return NextResponse.json({ entries: [], configured: true, needsSetup: true });
      }

      console.error("Crossword leaderboard read failed:", error);
      return NextResponse.json({ error: "Failed to read leaderboard" }, { status: 500 });
    }

    return NextResponse.json({ entries: (data ?? []) as CrosswordLeaderboardEntry[], configured: true });
  } catch (error) {
    console.error("Crossword leaderboard read failed:", error);
    return NextResponse.json({ error: "Failed to read leaderboard" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Leaderboard database is not configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid leaderboard payload" }, { status: 400 });
  }

  const score = parseScore(payload.score);

  if (score === null) {
    return NextResponse.json({ error: "Score must be a non-negative number" }, { status: 400 });
  }

  const rawPuzzleDate = typeof payload.puzzleDate === "string" ? payload.puzzleDate : "";
  const puzzleDate = isDateString(rawPuzzleDate) ? rawPuzzleDate : getTodayDate();
  const rawCompletedAt = typeof payload.completedAt === "string" ? payload.completedAt : "";
  const completedAt = Number.isNaN(Date.parse(rawCompletedAt)) ? new Date().toISOString() : new Date(rawCompletedAt).toISOString();

  try {
    const { data, error } = await supabase
      .from("crossword_leaderboard")
      .insert({
        player_name: sanitizePlayerName(payload.playerName),
        score,
        puzzle_date: puzzleDate,
        puzzle_number: sanitizeOptionalText(payload.puzzleNumber, 24),
        puzzle_title: sanitizeOptionalText(payload.puzzleTitle, 120),
        completed_at: completedAt,
        user_agent: request.headers.get("user-agent"),
      })
      .select(SELECT_COLUMNS)
      .single();

    if (error) {
      if (isMissingTableError(error)) {
        return NextResponse.json({ error: "Leaderboard database table is not set up" }, { status: 503 });
      }

      console.error("Crossword leaderboard write failed:", error);
      return NextResponse.json({ error: "Failed to save leaderboard score" }, { status: 500 });
    }

    return NextResponse.json({ entry: data as CrosswordLeaderboardEntry }, { status: 201 });
  } catch (error) {
    console.error("Crossword leaderboard write failed:", error);
    return NextResponse.json({ error: "Failed to save leaderboard score" }, { status: 500 });
  }
}
