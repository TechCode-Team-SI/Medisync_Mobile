import { View } from "react-native";
import AppointmentPage from "@/src/pages/Appointments/AppointmentPage";
import styles from "@/src/components/styles/styles";

export default function AppointmentScreen() {
  return (
    <View className={styles.container}>
      <AppointmentPage />
    </View>
  );
}
