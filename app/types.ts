// Types of the archived API responses (see openapi/api-server.yaml of the
// original repository).

export type User = {
  user_id: number;
  username: string;
  display_name: string;
  icon_path?: string;
  is_admin: boolean;
};

export type Problem = {
  problem_id: number;
  title: string;
  description: string;
};

export type Game = {
  game_id: number;
  game_type: "1v1" | "multiplayer";
  state: "closed" | "waiting" | "starting" | "gaming" | "finished";
  display_name: string;
  duration_seconds: number;
  started_at?: number;
  problem: Problem;
  players: User[];
};

export type RankingEntry = {
  player: User;
  score: number;
  submitted_at: number;
  code: string;
};

// RankingEntry with the syntax-highlighted HTML of its code, computed at build
// time.
export type HighlightedRankingEntry = RankingEntry & { code_html: string };
