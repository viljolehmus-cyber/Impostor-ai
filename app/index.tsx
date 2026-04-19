import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Eye, Sparkles, Wifi, Settings as SettingsIcon } from "lucide-react-native";
import { Screen } from "@/components/ui/Screen";
import { tapMedium } from "@/lib/haptics";
import { useGameStore } from "@/lib/game-state";
import type { GameMode } from "@/lib/types";

type ModeCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  onPress: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
};

function ModeCard({
  title,
  subtitle,
  icon,
  accent,
  onPress,
  disabled,
  comingSoon,
}: ModeCardProps) {
  return (
    <Pressable
      onPress={() => {
        if (disabled) return;
        tapMedium();
        onPress();
      }}
      disabled={disabled}
      className={`bg-bg-card rounded-3xl p-6 border border-white/5 mb-4 ${
        disabled ? "opacity-60" : "active:opacity-80"
      }`}
    >
      <View className="flex-row items-center gap-4">
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center"
          style={{ backgroundColor: accent + "22" }}
        >
          {icon}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-ink text-xl font-bold">{title}</Text>
            {comingSoon && (
              <View className="bg-white/10 rounded-full px-2 py-0.5">
                <Text className="text-ink-dim text-xs">Soon</Text>
              </View>
            )}
          </View>
          <Text className="text-ink-dim text-sm mt-1">{subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function Home() {
  const setMode = useGameStore((s) => s.setMode);
  const reset = useGameStore((s) => s.reset);

  const start = (mode: GameMode) => {
    reset();
    setMode(mode);
    router.push("/game/classic/setup");
  };

  return (
    <Screen>
      {/* Top bar */}
      <View className="flex-row items-center justify-between pt-2">
        <View />
        <Pressable className="w-10 h-10 items-center justify-center rounded-full active:bg-white/10">
          <SettingsIcon color="#9A9AB0" size={22} />
        </Pressable>
      </View>

      {/* Hero */}
      <View className="mt-8 mb-10">
        <Text className="text-ink text-5xl font-extrabold tracking-tight">
          Imposter
          <Text className="text-accent">.</Text>
        </Text>
        <Text className="text-ink-dim text-base mt-2 leading-6">
          One word. One liar. Find them before they bluff their way out.
        </Text>
      </View>

      {/* Modes */}
      <View>
        <ModeCard
          title="Classic"
          subtitle="3–12 players, pass-and-play"
          accent="#7C5CFF"
          icon={<Eye color="#7C5CFF" size={26} />}
          onPress={() => start("classic")}
        />
        <ModeCard
          title="Party"
          subtitle="Special roles, elimination rounds"
          accent="#FFB020"
          icon={<Sparkles color="#FFB020" size={26} />}
          onPress={() => start("party")}
          comingSoon
          disabled
        />
        <ModeCard
          title="Online"
          subtitle="Play with friends anywhere"
          accent="#39D98A"
          icon={<Wifi color="#39D98A" size={26} />}
          onPress={() => start("online")}
          comingSoon
          disabled
        />
      </View>

      <View className="flex-1" />
      <Text className="text-ink-dim text-xs text-center pb-4">
        v0.1 · Classic mode beta
      </Text>
    </Screen>
  );
}
