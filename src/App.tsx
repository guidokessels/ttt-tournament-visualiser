import React from "react";
import { TournamentBracket } from "./TournamentBracket";
import { useTournamentFetcher } from "./useTournamentFetcher";
import styles from "./App.module.css";
import { OptionsScreen } from "./OptionsScreen";

function App() {
  const params = new URLSearchParams(window.location.search);
  const tournamentId = params.get("tournament");

  return (
    <div className={styles.App}>
      {tournamentId ? (
        <TournamentScreen tournamentId={tournamentId} />
      ) : (
        <OptionsScreen />
      )}
    </div>
  );
}

function TournamentScreen({ tournamentId }: { tournamentId: string }) {
  const { data, error } = useTournamentFetcher(tournamentId);
  console.log({ tournamentId, data, error });
  if (error) {
    return (
      <p>
        Something went missing in Hyperspace and we could not load the
        tournament. Please refresh the page and try again.
      </p>
    );
  }
  return data ? <TournamentBracket tournament={data} /> : <p>Loading...</p>;
}

export default App;
