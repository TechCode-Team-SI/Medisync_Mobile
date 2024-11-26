import { View } from "react-native";
import ConfirmEmailPage from "@/src/pages/Login/ConfirmEmailPage";
import styles from "@/src/components/Styles/styles";

export default function ConfirmEmailScreen() {
  return (
    <View className={styles.container}>
      <ConfirmEmailPage/>
    </View>
  );
}