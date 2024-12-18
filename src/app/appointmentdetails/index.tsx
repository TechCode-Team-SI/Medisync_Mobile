import { View } from "react-native";
import AppointmentDetailsPage from "@/src/pages/Appointments/AppointmentDetailsPage";
import styles from "@/src/components/Styles/styles";

export default function AppointmentDetailsScreen() {
  return (
    <View className={styles.container}>
      <AppointmentDetailsPage />
    </View>
  );
}
