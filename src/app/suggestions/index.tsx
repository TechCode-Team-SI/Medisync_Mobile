import { View } from "react-native";
import SuggestionPage from "@/src/pages/Support/SuggestionsPage";
import styles from "@/src/components/styles/styles";

export default function SupportScreen() {
  return (
    <View className={styles.container}>
      <SuggestionPage />
    </View>
  );
}