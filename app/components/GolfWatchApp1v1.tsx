import type { Game, HighlightedRankingEntry, User } from "../types";
import BorderedContainer from "./BorderedContainer";
import CodeBlock from "./CodeBlock";
import ScoreBar from "./ScoreBar";
import { formatElapsedTime } from "./time";
import UserIcon from "./UserIcon";

type Props = {
  game: Game;
  playerA: User;
  playerB: User;
  ranking: HighlightedRankingEntry[];
};

export default function GolfWatchApp1v1({
  game,
  playerA,
  playerB,
  ranking,
}: Props) {
  const entryA = ranking.find((e) => e.player.user_id === playerA.user_id);
  const entryB = ranking.find((e) => e.player.user_id === playerB.user_id);
  const scoreA = entryA?.score ?? null;
  const scoreB = entryB?.score ?? null;

  // The ranking is sorted by score, and then by submission time.
  const winner = ranking.find(
    (e) =>
      e.player.user_id === playerA.user_id ||
      e.player.user_id === playerB.user_id,
  );
  const gameResult = !winner
    ? "draw"
    : winner.player.user_id === playerA.user_id
      ? "winA"
      : "winB";

  const topBg =
    gameResult === "winA"
      ? "bg-orange-400"
      : gameResult === "winB"
        ? "bg-purple-400"
        : "bg-pink-500";

  const elapsed = (entry: HighlightedRankingEntry | undefined) =>
    entry && game.started_at !== undefined
      ? `提出: ${formatElapsedTime(entry.submitted_at - game.started_at)}`
      : "正解の提出なし";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div
        className={`text-white ${topBg} grid grid-cols-1 md:grid-cols-3 gap-2 px-4 py-2`}
      >
        <div className="font-bold flex justify-between my-auto">
          <div className="flex gap-6">
            {playerA.icon_path && (
              <UserIcon
                iconPath={playerA.icon_path}
                displayName={playerA.display_name}
                className="w-12 h-12 my-auto"
              />
            )}
            <div>
              <div className="text-gray-100">Player 1</div>
              <div className="text-2xl">{playerA.display_name}</div>
            </div>
          </div>
          <div className="text-end">
            <div className="text-6xl">{scoreA}</div>
            <div className="text-sm text-gray-100">{elapsed(entryA)}</div>
          </div>
        </div>
        <div className="font-bold text-center">
          <div className="text-gray-100">{game.display_name}</div>
          <div className="text-3xl">
            {gameResult === "winA"
              ? `勝者 ${playerA.display_name}`
              : gameResult === "winB"
                ? `勝者 ${playerB.display_name}`
                : "引き分け"}
          </div>
        </div>
        <div className="font-bold flex justify-between my-auto">
          <div>
            <div className="text-6xl">{scoreB}</div>
            <div className="text-sm text-gray-100">{elapsed(entryB)}</div>
          </div>
          <div className="flex gap-6 text-end">
            <div>
              <div className="text-gray-100">Player 2</div>
              <div className="text-2xl">{playerB.display_name}</div>
            </div>
            {playerB.icon_path && (
              <UserIcon
                iconPath={playerB.icon_path}
                displayName={playerB.display_name}
                className="w-12 h-12 my-auto"
              />
            )}
          </div>
        </div>
      </div>
      <ScoreBar
        scoreA={scoreA}
        scoreB={scoreB}
        bgA="bg-orange-400"
        bgB="bg-purple-400"
      />
      <div className="grow grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
        <CodeBlock html={entryA?.code_html ?? ""} />
        <div>
          <div className="mb-2 text-center text-xl font-bold">
            {game.problem.title}
          </div>
          <BorderedContainer>{game.problem.description}</BorderedContainer>
        </div>
        <CodeBlock html={entryB?.code_html ?? ""} />
      </div>
    </div>
  );
}
