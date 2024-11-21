import { View } from "react-native";
import HomePage from "@/src/pages/HomePage";
import styles from "@/src/components/Styles/styles";

export default function HomeScreen() {
  return (
    <View className={styles.container}>
      <HomePage />
    </View>
  );
}
