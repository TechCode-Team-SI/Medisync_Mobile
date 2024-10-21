import { View } from "react-native";
import SupportHistoryPage from "@/src/pages/Support/SupportHistoryPage";
import styles from "@/src/components/styles/styles";

export default function SupportHistoryScreen() {
  return (
    <View className={styles.container}>
      <SupportHistoryPage />
    </View>
  );
}
