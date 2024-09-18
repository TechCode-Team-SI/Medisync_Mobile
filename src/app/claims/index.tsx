import { View } from "react-native";
import ClaimsPage from "@/src/pages/Support/ClaimsPage";
import styles from "@/src/components/styles/styles";

export default function ClaimsScreen() {
  return (
    <View className={styles.container}>
      <ClaimsPage />
    </View>
  );
}