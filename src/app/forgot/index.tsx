import { View } from "react-native";
import ForgotPasswordPage from "@/src/pages/Login/ForgotPasswordPage";
import styles from "@/src/components/Styles/styles";

export default function ForgotScreen() {
  return (
    <View className={styles.container}>
      <ForgotPasswordPage />
    </View>
  );
}
