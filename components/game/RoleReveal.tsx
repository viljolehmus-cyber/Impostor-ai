import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { Fingerprint, EyeOff } from "lucide-react-native";
import { tapMedium, success, warning } from "@/lib/haptics";

type Props = {
  playerName: string;
  isImposter: boolean;
  word: string;
  category: string;
  onDone: () => void;
};

const HOLD_MS = 1200;

// Hold-to-reveal: while pressed, fill animates 0→1 over HOLD_MS, then card
// flips to show the role. Releasing early cancels and resets.
export function RoleReveal({
  playerName,
  isImposter,
  word,
  category,
  onDone,
}: Props) {
  const progress = useSharedValue(0);
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const start = () => {
    if (revealed) return;
    progress.value = withTiming(1, {
      duration: HOLD_MS,
      easing: Easing.inOut(Easing.ease),
    });
    timer.current = setTimeout(() => {
      setRevealed(true);
      if (isImposter) warning();
      else success();
    }, HOLD_MS);
  };

  const cancel = () => {
    if (revealed) return;
    if (timer.current) clearTimeout(timer.current);
    progress.value = withTiming(0, { duration: 200 });
  };

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#7C5CFF55", "#7C5CFF"],
    ),
  }));

  const handleDone = () => {
    tapMedium();
    onDone();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-ink-dim mb-3">Pass the phone to</Text>
      <Text className="text-ink text-3xl font-bold mb-10">{playerName}</Text>

      {!revealed ? (
        <Pressable
          onPressIn={start}
          onPressOut={cancel}
          className="w-72 h-72 rounded-full items-center justify-center bg-bg-card border border-white/10 overflow-hidden"
        >
          {/* Fill ring */}
          <Animated.View
            pointerEvents="none"
            className="absolute left-0 top-0 bottom-0 opacity-40"
            style={fillStyle}
          />
          <Fingerprint color="#7C5CFF" size={88} />
          <Text className="text-ink mt-5 text-base font-semibold">
            Hold to reveal
          </Text>
          <Text className="text-ink-dim text-xs mt-1">
            Don't let anyone else see
          </Text>
        </Pressable>
      ) : isImposter ? (
        <View className="w-72 h-72 rounded-3xl items-center justify-center bg-accent-danger/15 border border-accent-danger/40 px-6">
          <EyeOff color="#FF4D6D" size={48} />
          <Text className="text-accent-danger text-2xl font-extrabold mt-4">
            You are the Imposter
          </Text>
          <Text className="text-ink-dim text-center text-sm mt-3">
            Bluff a clue. Don't get caught.
          </Text>
          <Text className="text-ink-dim text-xs mt-3">
            Category: {category}
          </Text>
        </View>
      ) : (
        <View className="w-72 h-72 rounded-3xl items-center justify-center bg-accent/15 border border-accent/40 px-6">
          <Text className="text-ink-dim text-xs uppercase tracking-widest">
            {category}
          </Text>
          <Text className="text-ink text-3xl font-extrabold mt-3 text-center">
            {word}
          </Text>
          <Text className="text-ink-dim text-center text-sm mt-3">
            Give a one-word clue when it's your turn.
          </Text>
        </View>
      )}

      <View className="h-12" />
      <Pressable
        onPress={revealed ? handleDone : undefined}
        disabled={!revealed}
        className={`px-8 py-4 rounded-2xl ${
          revealed ? "bg-accent active:opacity-80" : "bg-white/5"
        }`}
      >
        <Text
          className={`font-semibold ${
            revealed ? "text-white" : "text-ink-dim"
          }`}
        >
          {revealed ? "I'm done — pass it on" : "Reveal first"}
        </Text>
      </Pressable>
    </View>
  );
}
