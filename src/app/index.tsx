import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

import HomePage from "../pages/HomePage";
import AuthLoading from "../components/Auth/AuthLoading";

export default function HomeScreen() {
  return (
    <View className="bg-white">
      <AuthLoading />
    </View>
  );
}
