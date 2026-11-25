import type { Game, HighlightedRankingEntry } from "./types";

// Data embedded into each prerendered page (see /prerender.ts).
export type PageData =
  | { page: "index" }
  | {
      page: "dashboard";
      games: Pick<Game, "game_id" | "game_type" | "display_name">[];
    }
  | { page: "watch"; game: Game; ranking: HighlightedRankingEntry[] };

const APP_NAME = "iOSDC Japan 2024 Albatross.swift";

export function pageTitle(data: PageData): string {
  switch (data.page) {
    case "index":
      return APP_NAME;
    case "dashboard":
      return `Dashboard | ${APP_NAME}`;
    case "watch":
      return `Golf Watching ${data.game.display_name} | ${APP_NAME}`;
  }
}
