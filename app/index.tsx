import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

import LoginPage from "@/src/pages/Login/LoginPage";
import HomePage from "@/src/pages/HomePage";
import Prueba from "@/src/pages/Prueba";
import RegisterPage from "@/src/pages/Login/RegisterPage";

export default function HomeScreen() {
  return (
      <View className={styles.container}>
          <LoginPage/>
      </View>
  );
}
