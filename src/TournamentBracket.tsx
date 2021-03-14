import React, { PropsWithChildren } from "react";
import { TournamentGame } from "./TournamentGame";
import { Tournament } from "./types";
// import appstyles from "./App.module.css";
import styles from "./TournamentRound.module.css";

export const TournamentRound = ({ children }: PropsWithChildren<{}>) => {
  return <div className={styles.TournamentRound}>{children}</div>;
};

type Props = {
  tournament: Tournament;
};

export const TournamentBracket = ({ tournament }: Props) => {
  return (
    <>
      {/* <h1 className={appstyles.TournamentName}>{tournament.name}</h1> */}
      <div className={styles.TournamentBracket}>
        {tournament.rounds.map((round, i) => {
          return (
            <TournamentRound key={i}>
              {round.matches.map((match, j) => {
                return (
                  <TournamentGame
                    key={j}
                    winnerMoves={
                      i === tournament.rounds.length - 1
                        ? undefined
                        : j % 2
                        ? "UP"
                        : "DOWN"
                    }
                    match={match}
                  />
                );
              })}
            </TournamentRound>
          );
        })}
      </div>
    </>
  );
};
