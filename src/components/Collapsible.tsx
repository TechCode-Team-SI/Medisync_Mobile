import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./ui/Text";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="py-1">
      <TouchableOpacity
        className="flex flex-row items-center gap-1.5"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
        />
        <Text className="font-bold text-base">{title}</Text>
      </TouchableOpacity>
      {isOpen && <View className="mt-1.5 ml-6">{children}</View>}
    </View>
  );
}
