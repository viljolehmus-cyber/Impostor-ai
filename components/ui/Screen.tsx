import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Screen({ children, className = "" }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-bg" edges={["top", "bottom"]}>
      <View className={`flex-1 px-6 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}
