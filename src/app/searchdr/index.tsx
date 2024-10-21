import { View } from "react-native";
import SearchDrPage from "@/src/pages/SearchDrPage";
import styles from "@/src/components/styles/styles";

export default function SearchScreen() {
  return (
    <View className={styles.container}>
      <SearchDrPage />
    </View>
  );
}
