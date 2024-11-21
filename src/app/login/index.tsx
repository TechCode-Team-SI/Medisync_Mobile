import { View } from "react-native";
import LoginPage from "@/src/pages/Login/LoginPage";
import styles from "@/src/components/Styles/styles";

export default function LoginScreen() {
  return (
    <View className={styles.container}>
      <LoginPage />
    </View>
  );
}
