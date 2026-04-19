import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return (
    <View
      className={`bg-bg-card rounded-2xl border border-white/5 p-5 ${className}`}
    >
      {children}
    </View>
  );
}
