import { View } from "react-native";
import CustomerSupportPage from "@/src/pages/Support/CustomerSupportPage";
import styles from "@/src/components/styles/styles";

export default function SupportScreen() {
  return (
    <View className={styles.container}>
      <CustomerSupportPage />
    </View>
  );
}