import { View } from "react-native";
import UsPage from "@/src/pages/AboutUs/UsPage";
import styles from "@/src/components/Styles/styles";

export default function AboutUsScreen() {
  return (
    <View className={styles.container}>
      <UsPage />
    </View>
  );
}
