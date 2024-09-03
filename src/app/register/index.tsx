import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import RegisterPage from "@/src/pages/Login/RegisterPage";

export default function RegisterScreen() {
  return (
    <View className={styles.container}>
      <RegisterPage />
    </View>
  );
}
