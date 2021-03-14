import { useEffect, useState } from "react";
import {
  TableTopToTournament,
  Tournament,
  TournamentMatch,
  TournamentPlayer,
  TournamentRound,
} from "./types";

export const useTournamentFetcher = (tournamentId: string | null) => {
  const [data, setData] = useState<Tournament | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function run() {
      // @TODO Ask tabletop.to if they will allow CORS requests
      const url = `https://tabletop.to/${tournamentId}/listjuggler`;
      const corsProxy = "https://thingproxy.freeboard.io/fetch/";
      const request = await fetch(`${corsProxy}${url}`);

      const result = await request.json();
      const parsedData = parseData(result.tournament);
      setData(parsedData);
    }

    if (tournamentId) {
      run().catch(() => {
        setError(true);
      });
    }
  }, [tournamentId]);

  return { data, error };
};

// @TODO Create types for tabletop.to's response format so we can get rid of all `any` types
function parseData(data: TableTopToTournament): Tournament {
  return {
    name: data.name,
    players: data.players.map(
      (player: any, index: number): TournamentPlayer => ({
        id: index,
        name: player.name,
        list: {
          faction: player.list.faction,
          points: player.list.points,
        },
      })
    ),
    rounds: data.rounds
      .filter((r: any) => r["round-type"] === "elimination")
      .map(
        (round: any, i: number): TournamentRound => ({
          round: i,
          name: i.toString(),
          matches: round.matches.map(
            (match: any): TournamentMatch => ({
              player1: match.player1,
              player2: match.player2,
              points: {
                player1: match.player1points,
                player2: match.player2points,
              },
              winner:
                match.player1points > match.player2points
                  ? match.player1
                  : match.player2,
            })
          ),
        })
      ),
  };
}
