// Renders every page of the site into dist/ as static HTML, with the data
// each page needs embedded for hydration. Run after `vite build`.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";
import { createServer } from "vite";
import type { PageData } from "./app/pageData";
import type { Game, RankingEntry } from "./app/types";

type EntryServer = {
  render: (data: PageData) => string;
  pageTitle: (data: PageData) => string;
};

loadLanguages(["swift"]);

function highlight(code: string): string {
  return Prism.highlight(code, Prism.languages.swift!, "swift");
}

async function readData<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(`data/${path}`, "utf8")) as T;
}

async function collectPages(): Promise<[string, PageData][]> {
  const gameIds = (await readdir("data/games"))
    .filter((file) => file.endsWith(".json"))
    .map((file) => Number(file.replace(/\.json$/, "")))
    .sort((a, b) => a - b);

  const games: Game[] = [];
  const pages: [string, PageData][] = [];
  for (const id of gameIds) {
    const { game } = await readData<{ game: Game }>(`games/${id}.json`);
    const { ranking } = await readData<{ ranking: RankingEntry[] }>(
      `games/${id}/watch/ranking.json`,
    );
    games.push(game);
    pages.push([
      `golf/${id}/watch/`,
      {
        page: "watch",
        game,
        ranking: ranking.map((entry) => ({
          ...entry,
          code_html: highlight(entry.code),
        })),
      },
    ]);
  }
  return [
    ["", { page: "index" }],
    [
      "dashboard/",
      {
        page: "dashboard",
        games: games.map(({ game_id, game_type, display_name }) => ({
          game_id,
          game_type,
          display_name,
        })),
      },
    ],
    ...pages,
  ];
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true },
});
try {
  const { render, pageTitle } = (await vite.ssrLoadModule(
    "/app/entry-server.tsx",
  )) as EntryServer;
  const template = await readFile("dist/index.html", "utf8");

  for (const [path, data] of await collectPages()) {
    const json = JSON.stringify(data).replaceAll("<", "\\u003c");
    // Use replacer functions so that "$" in the content is not interpreted as
    // a replacement pattern (submitted code may contain "$0" or "$&").
    const html = template
      .replace(
        "</head>",
        () => `<title>${escapeHtml(pageTitle(data))}</title></head>`,
      )
      .replace(
        '<div id="root"></div>',
        () =>
          `<div id="root">${render(data)}</div><script id="page-data" type="application/json">${json}</script>`,
      );
    await mkdir(`dist/${path}`, { recursive: true });
    await writeFile(`dist/${path}index.html`, html);
    console.log(`dist/${path}index.html`);
  }
} finally {
  await vite.close();
}
