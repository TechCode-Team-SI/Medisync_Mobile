import { View } from "react-native";
import ContactPage from "@/src/pages/AboutUs/ContactPage";
import styles from "@/src/components/styles/styles";

export default function ContactScreen() {
  return (
    <View className={styles.container}>
      <ContactPage />
    </View>
  );
}
