import { View } from "react-native";
import CreateAppointmentPage from "@/src/pages/Appointments/CreateAppointmentPage";
import styles from "@/src/components/styles/styles";

export default function CreateAppointmentScreen() {
  return (
    <View className={styles.container}>
      <CreateAppointmentPage/>
    </View>
  );
}