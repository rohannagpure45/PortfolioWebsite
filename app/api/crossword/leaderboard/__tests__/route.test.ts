import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSupabaseFrom = vi.fn();

vi.mock("@/lib/supabaseClient", () => ({
  supabase: {
    from: (table: string) => mockSupabaseFrom(table),
  },
}));

function createReadChain(data: unknown[] = [], error: Error | null = null) {
  const chain = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    order: vi.fn(() => chain),
    limit: vi.fn().mockResolvedValue({ data, error }),
  };

  return chain;
}

function createWriteChain(data: unknown, error: Error | null = null) {
  const single = vi.fn().mockResolvedValue({ data, error });
  const select = vi.fn(() => ({ single }));
  const insert = vi.fn(() => ({ select }));

  return { insert, select, single };
}

describe("/api/crossword/leaderboard", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("reads leaderboard rows for a puzzle date", async () => {
    const rows = [
      {
        id: 1,
        player_name: "Rohan",
        score: 92,
        puzzle_date: "2026-05-20",
        completed_at: "2026-05-20T14:52:00.000Z",
      },
    ];
    const readChain = createReadChain(rows);
    mockSupabaseFrom.mockReturnValue(readChain);

    const { GET } = await import("../route");
    const response = await GET(new Request("http://localhost/api/crossword/leaderboard?puzzleDate=2026-05-20"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mockSupabaseFrom).toHaveBeenCalledWith("crossword_leaderboard");
    expect(readChain.eq).toHaveBeenCalledWith("puzzle_date", "2026-05-20");
    expect(payload.entries).toEqual(rows);
    expect(payload.configured).toBe(true);
  });

  it("rejects invalid scores before writing", async () => {
    const { POST } = await import("../route");
    const response = await POST(
      new Request("http://localhost/api/crossword/leaderboard", {
        method: "POST",
        body: JSON.stringify({ playerName: "Rohan", score: -1, puzzleDate: "2026-05-20" }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("Score");
    expect(mockSupabaseFrom).not.toHaveBeenCalled();
  });

  it("returns an empty setup state when the leaderboard table is missing", async () => {
    const readChain = createReadChain([], Object.assign(new Error("missing table"), { code: "PGRST205" }));
    mockSupabaseFrom.mockReturnValue(readChain);

    const { GET } = await import("../route");
    const response = await GET(new Request("http://localhost/api/crossword/leaderboard?puzzleDate=2026-05-20"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.entries).toEqual([]);
    expect(payload.needsSetup).toBe(true);
  });

  it("writes sanitized leaderboard scores", async () => {
    const savedRow = {
      id: 2,
      player_name: "Guest",
      score: 101,
      puzzle_date: "2026-05-20",
      puzzle_number: "32706",
      puzzle_title: "Crossword 32706 (Wed 05/20/26)",
      completed_at: "2026-05-20T15:00:00.000Z",
    };
    const writeChain = createWriteChain(savedRow);
    mockSupabaseFrom.mockReturnValue(writeChain);

    const { POST } = await import("../route");
    const response = await POST(
      new Request("http://localhost/api/crossword/leaderboard", {
        method: "POST",
        body: JSON.stringify({
          playerName: "   ",
          score: 101.4,
          puzzleDate: "2026-05-20",
          puzzleNumber: "32706",
          puzzleTitle: "Crossword 32706 (Wed 05/20/26)",
          completedAt: "2026-05-20T15:00:00.000Z",
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(writeChain.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        player_name: "Guest",
        score: 101,
        puzzle_date: "2026-05-20",
        puzzle_number: "32706",
        puzzle_title: "Crossword 32706 (Wed 05/20/26)",
      }),
    );
    expect(payload.entry).toEqual(savedRow);
  });
});
