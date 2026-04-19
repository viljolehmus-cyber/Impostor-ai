import { FlatList, Pressable, Text, View } from "react-native";
import { X } from "lucide-react-native";
import type { Player } from "@/lib/types";
import { tapLight } from "@/lib/haptics";

type Props = {
  players: Player[];
  onRemove?: (id: string) => void;
};

export function PlayerList({ players, onRemove }: Props) {
  if (players.length === 0) {
    return (
      <View className="py-6 items-center">
        <Text className="text-ink-dim">No players yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={players}
      keyExtractor={(p) => p.id}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item, index }) => (
        <View className="bg-bg-card rounded-xl px-4 py-3 flex-row items-center justify-between border border-white/5">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-full bg-accent/20 items-center justify-center">
              <Text className="text-accent font-semibold">{index + 1}</Text>
            </View>
            <Text className="text-ink text-base">{item.name}</Text>
          </View>
          {onRemove && (
            <Pressable
              hitSlop={12}
              onPress={() => {
                tapLight();
                onRemove(item.id);
              }}
              className="w-8 h-8 items-center justify-center rounded-full active:bg-white/10"
            >
              <X color="#9A9AB0" size={18} />
            </Pressable>
          )}
        </View>
      )}
    />
  );
}
