import { View } from "react-native";
import CodePasswordPage from "@/src/pages/Login/CodePasswordPage";
import styles from "@/src/components/styles/styles";

export default function CodePasswordScreen() {
  return (
    <View className={styles.container}>
      <CodePasswordPage />
    </View>
  );
}
