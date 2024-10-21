import { View } from "react-native";
import RegisterPage from "@/src/pages/Login/RegisterPage";
import styles from "@/src/components/styles/styles";

export default function RegisterScreen() {
  return (
    <View className={styles.container}>
      <RegisterPage />
    </View>
  );
}
