import { View } from "react-native";
import SearchDrPage from "@/src/pages/Appointments/SearchDrPage";
import styles from "@/src/components/Styles/styles";

export default function SearchScreen() {
  return (
    <View className={styles.container}>
      <SearchDrPage />
    </View>
  );
}
