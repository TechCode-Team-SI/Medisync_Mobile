import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

import useWebSocket from '../hooks/WebSocket/useWebSocket';
import HomePage from "../pages/HomePage";

export default function HomeScreen() {
  useWebSocket()
  return (
    <View className={styles.container}>
      <HomePage />
    </View>
  );
}
