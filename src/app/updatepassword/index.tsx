import { View } from "react-native";
import UpdatePasswordPage from "@/src/pages/User/UpdatePasswordPage";
import styles from "@/src/components/styles/styles";

export default function UpdatePasswordScreen() {
  return (
    <View className={styles.container}>
      <UpdatePasswordPage/>
    </View>
  );
}
