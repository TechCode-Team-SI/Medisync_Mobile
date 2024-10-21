import { View } from "react-native";
import SearchPage from "@/src/pages/SearchPage";
import styles from "@/src/components/styles/styles";

export default function SearchScreen() {
  return (
    <View className={styles.container}>
      <SearchPage />
    </View>
  );
}
