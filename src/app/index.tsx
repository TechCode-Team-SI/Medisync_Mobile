import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import { WebSocketProvider } from "../components/WebSocketProvider";

import HomePage from "../pages/HomePage";
import AuthLoading from "../components/Auth/AuthLoading";

export default function HomeScreen() {
  return (
    <WebSocketProvider>
      <View className="bg-white">
        <AuthLoading />
      </View>
    </WebSocketProvider>
  );
}
