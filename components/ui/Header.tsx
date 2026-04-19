import { Pressable, Text, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { tapLight } from "@/lib/haptics";

type Props = {
  title?: string;
  showBack?: boolean;
};

export function Header({ title, showBack = true }: Props) {
  return (
    <View className="flex-row items-center justify-between py-3 mb-2">
      <View className="w-10">
        {showBack && router.canGoBack() ? (
          <Pressable
            onPress={() => {
              tapLight();
              router.back();
            }}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-white/10"
            hitSlop={12}
          >
            <ChevronLeft color="#fff" size={26} />
          </Pressable>
        ) : null}
      </View>
      <Text className="text-ink text-base font-semibold">{title ?? ""}</Text>
      <View className="w-10" />
    </View>
  );
}
