import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import HomePage from "@/src/pages/HomePage";

export default function HomeScreen() {
  return (
    <View className={styles.container}>
      <HomePage />
    </View>
  );
}
