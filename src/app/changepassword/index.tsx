import { View } from "react-native";
import ChangePasswordPage from "@/src/pages/Login/ChangePasswordPage";
import styles from "@/src/components/styles/styles";

export default function ChangePasswordScreen() {
  return (
    <View className={styles.container}>
      <ChangePasswordPage />
    </View>
  );
}