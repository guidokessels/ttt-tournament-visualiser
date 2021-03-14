export type XWingFaction = string;

export type XWingList = {
  points: number;
  faction: XWingFaction;
};

export type TournamentPlayerId = number;
export type TournamentPlayer = {
  id: TournamentPlayerId;
  name: string;
  list: XWingList;
};

export type TournamentRound = {
  round: number;
  name: string;
  matches: TournamentMatch[];
};

export type TournamentMatch = {
  player1: TournamentPlayerId;
  player2: TournamentPlayerId;
  winner: TournamentPlayerId;
  points: {
    player1: number;
    player2: number;
  };
};

export type Tournament = {
  name: string;
  rounds: TournamentRound[];
  players: TournamentPlayer[];
};

// @TODO
export type TableTopToTournament = any;
