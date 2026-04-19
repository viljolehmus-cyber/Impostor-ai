import { Text, View } from "react-native";
import { router } from "expo-router";
import { Trophy, Skull } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/lib/game-state";

export default function Results() {
  const result = useGameStore((s) => s.result);
  const players = useGameStore((s) => s.players);
  const rematch = useGameStore((s) => s.rematch);
  const reset = useGameStore((s) => s.reset);

  if (!result) return null;

  const imposter = players.find((p) => p.id === result.imposterId);
  const votedOut = players.find((p) => p.id === result.votedOutId);
  const playersWon = result.winner === "players";

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <View
          className={`w-24 h-24 rounded-full items-center justify-center mb-6 ${
            playersWon ? "bg-accent-success/20" : "bg-accent-danger/20"
          }`}
        >
          {playersWon ? (
            <Trophy color="#39D98A" size={44} />
          ) : (
            <Skull color="#FF4D6D" size={44} />
          )}
        </View>

        <Text
          className={`text-4xl font-extrabold ${
            playersWon ? "text-accent-success" : "text-accent-danger"
          }`}
        >
          {playersWon ? "Players Win!" : "Imposter Wins!"}
        </Text>

        <View className="mt-10 w-full px-4 gap-3">
          <View className="bg-bg-card rounded-2xl p-5 border border-white/5">
            <Text className="text-ink-dim text-xs uppercase tracking-widest">
              Imposter
            </Text>
            <Text className="text-ink text-2xl font-bold mt-1">
              {imposter?.name ?? "—"}
            </Text>
          </View>

          <View className="bg-bg-card rounded-2xl p-5 border border-white/5">
            <Text className="text-ink-dim text-xs uppercase tracking-widest">
              Secret word
            </Text>
            <Text className="text-ink text-2xl font-bold mt-1">
              {result.word}
            </Text>
          </View>

          <View className="bg-bg-card rounded-2xl p-5 border border-white/5">
            <Text className="text-ink-dim text-xs uppercase tracking-widest">
              Voted out
            </Text>
            <Text className="text-ink text-2xl font-bold mt-1">
              {votedOut?.name ?? "Tie — no one"}
            </Text>
          </View>
        </View>
      </View>

      <View className="pb-4 gap-2">
        <Button
          label="Rematch — same players"
          onPress={() => {
            rematch();
            router.replace("/game/classic/reveal");
          }}
        />
        <Button
          label="Back to home"
          variant="ghost"
          onPress={() => {
            reset();
            router.replace("/");
          }}
        />
      </View>
    </Screen>
  );
}
