export type Player = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  words: string[];
  source: "builtin" | "ai";
};

export type GameMode = "classic" | "party" | "online";

export type GamePhase =
  | "setup"
  | "reveal"
  | "clues"
  | "vote"
  | "results";

export type GameResult = {
  winner: "players" | "imposter";
  votedOutId: string | null;
  imposterId: string;
  word: string;
};
