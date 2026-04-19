# Imposter AI

A cross-platform social deduction party game (iOS, Android, Web) built with Expo.

> **Status:** v0.1 — Classic Mode happy path scaffolded. Party Mode, Online Mode, and Groq AI categories are stubbed and will land in later iterations.

## Run

```bash
npm install
npm run web      # browser
npm run ios      # iOS simulator
npm run android  # Android emulator
```

## Stack

- **Expo + Expo Router** (file-based routing, web/iOS/Android)
- **NativeWind** (Tailwind for RN)
- **Zustand** (game state)
- **lucide-react-native** (icons)
- **react-native-reanimated** (hold-to-reveal animation)
- **expo-haptics** (tactile feedback on key actions)

## File structure

```
app/
  _layout.tsx                  # root stack
  index.tsx                    # Home — Classic / Party / Online
  game/classic/
    setup.tsx                  # add players (3–12)
    category.tsx               # pick a topic
    reveal.tsx                 # hold-to-see role (per player)
    clues.tsx                  # whose turn to give a clue
    vote.tsx                   # pass-and-play voting
    results.tsx                # winner + rematch
components/
  ui/                          # Button, Card, Screen, Header
  game/                        # PlayerList, RoleReveal
lib/
  game-state.ts                # Zustand store + game logic
  categories.ts                # built-in word lists
  haptics.ts                   # cross-platform haptics wrapper
  types.ts
```

## Classic Mode flow

`Home → Setup → Category → Reveal (×N) → Clues (×N) → Vote (×N) → Results`

- One random player is the Imposter, everyone else sees the same secret word.
- Each player holds the fingerprint to reveal their role privately.
- Players give one-word clues out loud, then everyone votes.
- Imposter caught → players win. Tie or wrong vote → Imposter wins.

## Coming next

- Groq AI categories (`lib/groq.ts`)
- Party Mode (Detective, Double Agent, elimination rounds)
- Express + Socket.IO backend for Online Mode
- Light theme polish, sound effects
