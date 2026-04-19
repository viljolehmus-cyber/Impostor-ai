import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { BUILTIN_CATEGORIES } from "@/lib/categories";
import { useGameStore } from "@/lib/game-state";
import { tapMedium } from "@/lib/haptics";
import type { Category } from "@/lib/types";

export default function CategoryPicker() {
  const category = useGameStore((s) => s.category);
  const pickCategory = useGameStore((s) => s.pickCategory);
  const startRound = useGameStore((s) => s.startRound);

  const select = (c: Category) => {
    tapMedium();
    pickCategory(c);
  };

  const onStart = () => {
    if (!category) return;
    startRound();
    router.push("/game/classic/reveal");
  };

  return (
    <Screen>
      <Header title="Category" />

      <Text className="text-ink text-3xl font-bold">Choose a topic</Text>
      <Text className="text-ink-dim mt-2">
        Everyone sees the same word — except the Imposter.
      </Text>

      <ScrollView
        className="mt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <View className="flex-row flex-wrap -mx-1.5">
          {BUILTIN_CATEGORIES.map((c) => {
            const selected = category?.id === c.id;
            return (
              <View key={c.id} className="w-1/2 px-1.5 mb-3">
                <Pressable
                  onPress={() => select(c)}
                  className={`rounded-2xl p-5 border ${
                    selected
                      ? "bg-accent/20 border-accent"
                      : "bg-bg-card border-white/5 active:opacity-80"
                  }`}
                >
                  <Text className="text-3xl">{c.emoji}</Text>
                  <Text className="text-ink text-lg font-semibold mt-2">
                    {c.name}
                  </Text>
                  <Text className="text-ink-dim text-xs mt-1">
                    {c.words.length} words
                  </Text>
                </Pressable>
              </View>
            );
          })}

          {/* AI placeholder — wired up in next iteration */}
          <View className="w-full px-1.5 mb-3 mt-2">
            <Pressable
              disabled
              className="rounded-2xl p-5 border border-dashed border-white/10 bg-white/5 opacity-60"
            >
              <View className="flex-row items-center gap-3">
                <Sparkles color="#FFB020" size={22} />
                <View className="flex-1">
                  <Text className="text-ink font-semibold">
                    Create with AI
                  </Text>
                  <Text className="text-ink-dim text-xs mt-0.5">
                    Generate a category from any topic — coming soon
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className="pb-4">
        <Button
          label={category ? `Start with ${category.name}` : "Pick a category"}
          disabled={!category}
          onPress={onStart}
        />
      </View>
    </Screen>
  );
}
