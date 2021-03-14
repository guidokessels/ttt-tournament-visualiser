import React from "react";
import styles from "./TournamentGamePlayerRow.module.css";

type TournamentGamePlayerRowProps = {
  player: string;
  points: number;
  won?: boolean;
};

export const TournamentGamePlayerRow = ({
  player,
  points,
  won,
}: TournamentGamePlayerRowProps) => {
  const classNames = [styles.TournamentGameRow];
  if (won) {
    classNames.push(styles.TournameGameWinner);
  }
  return (
    <div className={classNames.join(" ")}>
      <span className={styles.TournamentGamePlayer}>{player}</span>
      <span className={styles.TournamentGamePoints}>{points}</span>
    </div>
  );
};
