import { View } from "react-native";
import SearchPage from "@/src/pages/Appointments/SearchPage";
import styles from "@/src/components/Styles/styles";

export default function SearchScreen() {
  return (
    <View className={styles.container}>
      <SearchPage />
    </View>
  );
}
