import { View } from "react-native";
import NotificationsPage from "@/src/pages/NotificationsPage";
import styles from "@/src/components/Styles/styles";

export default function NotificationsScreen() {
  return (
    <View className={styles.container}>
      <NotificationsPage />
    </View>
  );
}