import BorderedContainer from "../components/BorderedContainer";
import NavigateLink from "../components/NavigateLink";
import type { Game } from "../types";

type Props = {
  games: Pick<Game, "game_id" | "game_type" | "display_name">[];
};

export default function DashboardPage({ games }: Props) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">試合一覧</h1>
      <BorderedContainer>
        <div className="px-4">
          <ul className="divide-y divide-gray-200">
            {games.map((game) => (
              <li
                key={game.game_id}
                className="flex justify-between items-center py-3 gap-3"
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {game.display_name}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {game.game_type === "multiplayer" ? " (マルチ)" : " (1v1)"}
                  </span>
                </div>
                <NavigateLink to={`golf/${game.game_id}/watch/`}>
                  結果を見る
                </NavigateLink>
              </li>
            ))}
          </ul>
        </div>
      </BorderedContainer>
    </div>
  );
}
