import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

<<<<<<< HEAD
import ConfigProfilePage from "@/src/pages/User/ConfigProfilePage";
=======
import LoginPage from "@/src/pages/Login/LoginPage";
import HomePage from "@/src/pages/HomePage";
import Prueba from "@/src/pages/Prueba";
import RegisterPage from "@/src/pages/Login/RegisterPage";
>>>>>>> 71930386391a3e084f074b3429440848a73cdc16

export default function HomeScreen() {
  return (
      <View className={styles.container}>
          <ConfigProfilePage/>
      </View>
  );
}
