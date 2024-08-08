import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";


import LoginPage from "@/src/pages/Login/LoginPage";

export default function HomeScreen() {
  return (
      <View className={styles.container}>
          <LoginPage/>
      </View>
  );
}
