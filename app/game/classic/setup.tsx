import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { PlayerList } from "@/components/game/PlayerList";
import { useGameStore } from "@/lib/game-state";

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 12;

export default function ClassicSetup() {
  const players = useGameStore((s) => s.players);
  const addPlayer = useGameStore((s) => s.addPlayer);
  const removePlayer = useGameStore((s) => s.removePlayer);
  const [name, setName] = useState("");

  const atMax = players.length >= MAX_PLAYERS;
  const canContinue = players.length >= MIN_PLAYERS;

  const submit = () => {
    if (!name.trim() || atMax) return;
    addPlayer(name);
    setName("");
  };

  return (
    <Screen>
      <Header title="Players" />

      <Text className="text-ink text-3xl font-bold">Who's playing?</Text>
      <Text className="text-ink-dim mt-2">
        {MIN_PLAYERS}–{MAX_PLAYERS} players · {players.length} added
      </Text>

      <View className="flex-row gap-2 mt-6">
        <View className="flex-1 bg-bg-card rounded-2xl px-4 border border-white/5 flex-row items-center">
          <TextInput
            value={name}
            onChangeText={setName}
            onSubmitEditing={submit}
            placeholder="Add a player"
            placeholderTextColor="#5A5A6E"
            className="flex-1 text-ink py-4"
            maxLength={18}
            returnKeyType="done"
            editable={!atMax}
          />
        </View>
        <Pressable
          onPress={submit}
          disabled={!name.trim() || atMax}
          className={`w-14 h-14 rounded-2xl items-center justify-center ${
            !name.trim() || atMax ? "bg-white/5" : "bg-accent active:opacity-80"
          }`}
        >
          <Plus color="#fff" size={22} />
        </Pressable>
      </View>

      <View className="mt-6 flex-1">
        <PlayerList players={players} onRemove={removePlayer} />
      </View>

      <View className="pb-4">
        <Button
          label={
            canContinue
              ? "Pick a Category →"
              : `Add ${MIN_PLAYERS - players.length} more player${
                  MIN_PLAYERS - players.length === 1 ? "" : "s"
                }`
          }
          disabled={!canContinue}
          onPress={() => router.push("/game/classic/category")}
        />
      </View>
    </Screen>
  );
}
