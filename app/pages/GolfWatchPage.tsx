import GolfWatchApp1v1 from "../components/GolfWatchApp1v1";
import GolfWatchAppMultiplayer from "../components/GolfWatchAppMultiplayer";
import type { Game, HighlightedRankingEntry } from "../types";

type Props = {
  game: Game;
  ranking: HighlightedRankingEntry[];
};

export default function GolfWatchPage({ game, ranking }: Props) {
  const [playerA, playerB] = game.players;
  // Some 1v1 games (the exhibition matches) have no registered players, so
  // they are shown as a ranking like multiplayer games.
  if (game.game_type === "1v1" && playerA && playerB) {
    return (
      <GolfWatchApp1v1
        game={game}
        playerA={playerA}
        playerB={playerB}
        ranking={ranking}
      />
    );
  }
  return <GolfWatchAppMultiplayer game={game} ranking={ranking} />;
}
