import { useEffect } from "react";
import { router } from "expo-router";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { RoleReveal } from "@/components/game/RoleReveal";
import { useGameStore } from "@/lib/game-state";

export default function Reveal() {
  const players = useGameStore((s) => s.players);
  const revealIndex = useGameStore((s) => s.revealIndex);
  const imposterId = useGameStore((s) => s.imposterId);
  const word = useGameStore((s) => s.word);
  const category = useGameStore((s) => s.category);
  const phase = useGameStore((s) => s.phase);
  const advanceReveal = useGameStore((s) => s.advanceReveal);

  // When everyone has seen their role, the store flips phase to "clues".
  useEffect(() => {
    if (phase === "clues") router.replace("/game/classic/clues");
  }, [phase]);

  if (!word || !category || !imposterId) return null;

  const player = players[revealIndex];
  if (!player) return null;

  return (
    <Screen>
      <Header title={`${revealIndex + 1} / ${players.length}`} showBack={false} />
      <RoleReveal
        key={player.id}
        playerName={player.name}
        isImposter={player.id === imposterId}
        word={word}
        category={category.name}
        onDone={advanceReveal}
      />
    </Screen>
  );
}
