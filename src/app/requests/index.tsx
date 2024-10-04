import { View } from "react-native";
import RequestsPage from "@/src/pages/Support/RequestsPage";
import styles from "@/src/components/Styles/styles";

export default function RequestsScreen() {
  return (
    <View className={styles.container}>
      <RequestsPage />
    </View>
  );
}