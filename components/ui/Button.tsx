import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { ReactNode } from "react";
import { tapLight } from "@/lib/haptics";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
};

const variants: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: "bg-accent active:opacity-80",
    text: "text-white",
  },
  secondary: {
    container: "bg-bg-card border border-white/10 active:opacity-80",
    text: "text-ink",
  },
  ghost: {
    container: "bg-transparent active:bg-white/5",
    text: "text-ink",
  },
  danger: {
    container: "bg-accent-danger active:opacity-80",
    text: "text-white",
  },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled,
  loading,
  icon,
  fullWidth = true,
}: Props) {
  const v = variants[variant];
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={() => {
        if (isDisabled) return;
        tapLight();
        onPress?.();
      }}
      disabled={isDisabled}
      className={`${v.container} ${
        fullWidth ? "w-full" : ""
      } rounded-2xl py-4 px-5 items-center justify-center ${
        isDisabled ? "opacity-50" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className={`${v.text} text-base font-semibold`}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
