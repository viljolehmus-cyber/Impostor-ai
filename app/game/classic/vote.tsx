import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/lib/game-state";
import { tapMedium } from "@/lib/haptics";

// Pass-and-play voting: each player taps the suspect, then hands the phone
// to the next player. Once everyone has voted we tally and show results.
export default function VotePhase() {
  const players = useGameStore((s) => s.players);
  const castVote = useGameStore((s) => s.castVote);
  const finishVoting = useGameStore((s) => s.finishVoting);

  const [voterIndex, setVoterIndex] = useState(0);
  const [pendingPick, setPendingPick] = useState<string | null>(null);

  const voter = players[voterIndex];
  const isLast = voterIndex >= players.length - 1;

  const submit = () => {
    if (!voter || !pendingPick) return;
    tapMedium();
    castVote(voter.id, pendingPick);
    setPendingPick(null);

    if (isLast) {
      finishVoting();
      router.replace("/game/classic/results");
    } else {
      setVoterIndex((i) => i + 1);
    }
  };

  if (!voter) return null;

  return (
    <Screen>
      <Header title={`Voting · ${voterIndex + 1}/${players.length}`} showBack={false} />

      <Text className="text-ink-dim mt-2">Pass the phone to</Text>
      <Text className="text-ink text-4xl font-extrabold mt-1">{voter.name}</Text>
      <Text className="text-ink-dim mt-3">Who do you think is the Imposter?</Text>

      <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
        {players.map((p) => {
          if (p.id === voter.id) return null; // can't vote for yourself
          const selected = pendingPick === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => {
                tapMedium();
                setPendingPick(p.id);
              }}
              className={`mb-2 rounded-2xl px-4 py-4 border flex-row items-center justify-between ${
                selected
                  ? "bg-accent/20 border-accent"
                  : "bg-bg-card border-white/5 active:opacity-80"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  selected ? "text-ink" : "text-ink"
                }`}
              >
                {p.name}
              </Text>
              {selected && <Check color="#7C5CFF" size={20} />}
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="pb-4">
        <Button
          label={isLast ? "Submit & Reveal" : "Confirm vote →"}
          onPress={submit}
          disabled={!pendingPick}
        />
      </View>
    </Screen>
  );
}
