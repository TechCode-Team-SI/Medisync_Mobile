import { View } from "react-native";
import HomeUserPage from "@/src/pages/User/HomeUserPage";
import styles from "@/src/components/Styles/styles";

export default function HomeUserScreen() {
  return (
    <View className={styles.container}>
      <HomeUserPage />
    </View>
  );
}
