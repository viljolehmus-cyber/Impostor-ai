import { Text, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/lib/game-state";
import { useEffect } from "react";
import { router } from "expo-router";

export default function CluesPhase() {
  const players = useGameStore((s) => s.players);
  const clueIndex = useGameStore((s) => s.clueIndex);
  const phase = useGameStore((s) => s.phase);
  const advance = useGameStore((s) => s.advanceClue);

  useEffect(() => {
    if (phase === "vote") router.replace("/game/classic/vote");
  }, [phase]);

  const player = players[clueIndex];
  const next = players[clueIndex + 1];

  return (
    <Screen>
      <Header title="Clue Round" showBack={false} />

      <View className="flex-1 items-center justify-center">
        <Text className="text-ink-dim mb-2">It's your turn</Text>
        <Text className="text-ink text-5xl font-extrabold text-center">
          {player?.name}
        </Text>

        <View className="mt-12 px-6">
          <Text className="text-ink text-center text-base leading-6">
            Say <Text className="text-accent font-bold">one word</Text> out loud
            that hints at the secret — without giving it away.
          </Text>
        </View>

        {next && (
          <Text className="text-ink-dim text-sm mt-10">
            Up next: {next.name}
          </Text>
        )}
      </View>

      <View className="pb-4">
        <Button
          label={
            clueIndex + 1 >= players.length ? "Start Voting →" : "Next player"
          }
          onPress={advance}
        />
      </View>
    </Screen>
  );
}
