import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

import useWebSocket from '../hooks/WebSocket/useWebSocket';
import HomePage from "../pages/HomePage";
import AuthLoading from "../components/Auth/AuthLoading";

export default function HomeScreen() {
  useWebSocket()
  return (
    <View className="bg-white">
      <AuthLoading />
    </View>
  );
}
