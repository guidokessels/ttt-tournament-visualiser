import React from "react";
import styles from "./TournamentGame.module.css";
import { TournamentGamePlayerRow } from "./TournamentGamePlayerRow";
import { TournamentMatch } from "./types";

type TournamentGameProps = {
  match: TournamentMatch;
  winnerMoves?: "UP" | "DOWN";
  flipped?: boolean;
};
export const TournamentGame = ({
  match,
  winnerMoves,
  flipped = false,
}: TournamentGameProps) => {
  let spacerClass = "";
  if (winnerMoves === "DOWN") {
    spacerClass = styles.TournamentGameResultsSpacerDown;
  } else if (winnerMoves === "UP") {
    spacerClass = styles.TournamentGameResultsSpacerUp;
  }

  let gameClass = [styles.TournamentGame];
  if (flipped) {
    gameClass.push(styles.TournamentGameFlipped);
  }

  return (
    <div className={gameClass.join(" ")}>
      <div className={styles.TournamentGamePlayers}>
        <TournamentGamePlayerRow
          player={match.player1.toString()}
          points={match.points.player1}
          won={match.winner === match.player1}
        />
        <TournamentGamePlayerRow
          player={match.player2.toString()}
          points={match.points.player2}
          won={match.winner === match.player2}
        />
      </div>
      {winnerMoves ? (
        <div
          className={[styles.TournamentGameResultsSpacer, spacerClass].join(
            " "
          )}
        >
          {winnerMoves === "DOWN" ? (
            <>
              <div className={styles.TournamentGameResultsSpacerDownStart} />
              <div className={styles.TournamentGameResultsSpacerDownEnd} />
            </>
          ) : (
            <>
              <div className={styles.TournamentGameResultsSpacerUpStart} />
              <div className={styles.TournamentGameResultsSpacerUpEnd} />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
