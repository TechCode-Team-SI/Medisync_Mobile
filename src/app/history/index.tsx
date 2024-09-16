import { View } from "react-native";
import AppointmentsHistoryPage from "@/src/pages/Appointments/AppointmentsHistoryPage";
import styles from "@/src/components/styles/styles";

export default function HistoryScreen() {
  return (
    <View className={styles.container}>
      <AppointmentsHistoryPage />
    </View>
  );
}