import { Fragment, useState } from "react";
import type { Game, HighlightedRankingEntry } from "../types";
import BorderedContainer from "./BorderedContainer";
import CodeBlock from "./CodeBlock";
import { formatUnixTimestamp } from "./time";

type Props = {
  game: Game;
  ranking: HighlightedRankingEntry[];
};

function RankingRow({
  rank,
  entry,
}: {
  rank: number;
  entry: HighlightedRankingEntry;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const cell = "px-4 py-3 whitespace-nowrap text-gray-900";
  return (
    <Fragment>
      <tr>
        <td className={cell}>{rank}</td>
        <td className={cell}>{entry.player.display_name}</td>
        <td className={cell}>{entry.score}</td>
        <td className={cell}>{formatUnixTimestamp(entry.submitted_at)}</td>
        <td className={cell}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-pink-600 underline underline-offset-4 hover:text-pink-500"
          >
            {isOpen ? "閉じる" : "表示"}
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={5} className="px-4 pb-3">
            <CodeBlock html={entry.code_html} />
          </td>
        </tr>
      )}
    </Fragment>
  );
}

export default function GolfWatchAppMultiplayer({ game, ranking }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="text-white bg-iosdc-japan px-4 py-4">
        <div className="font-bold text-center text-3xl">
          {game.display_name}
        </div>
      </div>
      <div className="grow grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
        <div>
          <div className="mb-2 text-center text-xl font-bold">
            {game.problem.title}
          </div>
          <BorderedContainer>{game.problem.description}</BorderedContainer>
        </div>
        <div>
          <div className="mb-2 text-center text-xl font-bold">順位表</div>
          <div className="overflow-x-auto border-2 border-pink-600 rounded-xl bg-white">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-50">
                <tr>
                  {["順位", "プレイヤー", "スコア", "提出時刻", "コード"].map(
                    (header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-4 py-3 text-left font-medium text-gray-800"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {ranking.map((entry, index) => (
                  <RankingRow
                    key={entry.player.user_id}
                    rank={index + 1}
                    entry={entry}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
