import { create } from "zustand";
import type { Category, GameMode, GamePhase, GameResult, Player } from "./types";

type State = {
  mode: GameMode;
  phase: GamePhase;
  players: Player[];
  category: Category | null;
  word: string | null;
  imposterId: string | null;
  // index of the player currently revealing their role (0-based, walks the players array)
  revealIndex: number;
  // index of the player whose turn it is to give a clue
  clueIndex: number;
  // playerId -> votedPlayerId
  votes: Record<string, string>;
  result: GameResult | null;
};

type Actions = {
  setMode: (mode: GameMode) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  pickCategory: (category: Category) => void;
  startRound: () => void;
  advanceReveal: () => void;
  advanceClue: () => void;
  castVote: (voterId: string, suspectId: string) => void;
  finishVoting: () => void;
  reset: () => void;
  rematch: () => void;
};

const INITIAL: State = {
  mode: "classic",
  phase: "setup",
  players: [],
  category: null,
  word: null,
  imposterId: null,
  revealIndex: 0,
  clueIndex: 0,
  votes: {},
  result: null,
};

const randomId = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useGameStore = create<State & Actions>((set, get) => ({
  ...INITIAL,

  setMode: (mode) => set({ mode }),

  setPlayers: (players) => set({ players }),

  addPlayer: (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    set((s) => ({
      players: [...s.players, { id: randomId(), name: trimmed }],
    }));
  },

  removePlayer: (id) =>
    set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

  pickCategory: (category) => set({ category }),

  // Assigns a random imposter and a random secret word from the chosen category.
  startRound: () => {
    const { players, category } = get();
    if (players.length < 3 || !category) return;
    const imposter = pickRandom(players);
    const word = pickRandom(category.words);
    set({
      phase: "reveal",
      imposterId: imposter.id,
      word,
      revealIndex: 0,
      clueIndex: 0,
      votes: {},
      result: null,
    });
  },

  advanceReveal: () =>
    set((s) => {
      const next = s.revealIndex + 1;
      if (next >= s.players.length) {
        return { revealIndex: next, phase: "clues" };
      }
      return { revealIndex: next };
    }),

  advanceClue: () =>
    set((s) => {
      const next = s.clueIndex + 1;
      if (next >= s.players.length) {
        return { clueIndex: next, phase: "vote" };
      }
      return { clueIndex: next };
    }),

  castVote: (voterId, suspectId) =>
    set((s) => ({ votes: { ...s.votes, [voterId]: suspectId } })),

  // Tally votes; tie → no one is voted out (imposter wins).
  finishVoting: () => {
    const { votes, imposterId, word } = get();
    if (!imposterId || !word) return;

    const tally: Record<string, number> = {};
    Object.values(votes).forEach((id) => {
      tally[id] = (tally[id] ?? 0) + 1;
    });

    let topId: string | null = null;
    let topCount = 0;
    let tied = false;
    for (const [id, count] of Object.entries(tally)) {
      if (count > topCount) {
        topId = id;
        topCount = count;
        tied = false;
      } else if (count === topCount) {
        tied = true;
      }
    }

    const votedOutId = tied ? null : topId;
    const winner: GameResult["winner"] =
      votedOutId === imposterId ? "players" : "imposter";

    set({
      phase: "results",
      result: {
        winner,
        votedOutId,
        imposterId,
        word,
      },
    });
  },

  reset: () => set({ ...INITIAL }),

  // Keep players + category, redraw imposter + word.
  rematch: () => {
    const { players, category } = get();
    set({ ...INITIAL, players, category });
    get().startRound();
  },
}));
