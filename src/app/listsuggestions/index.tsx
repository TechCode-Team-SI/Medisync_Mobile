import { View } from "react-native";
import ListSuggestionsPage from "@/src/pages/Support/ListSuggestionsPage";
import styles from "@/src/components/styles/styles";

export default function ListSuggestionsScreen() {
  return (
    <View className={styles.container}>
      <ListSuggestionsPage />
    </View>
  );
}