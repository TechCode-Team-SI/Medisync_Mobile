import { View } from "react-native";
import PublicationPage from "@/src/pages/Board/PublicationPage";
import styles from "@/src/components/styles/styles";

export default function PublicationScreen() {
  return (
    <View className={styles.container}>
      <PublicationPage />
    </View>
  );
}
