import { View } from "react-native";
import FamilyPage from "@/src/pages/User/FamilyPage";
import styles from "@/src/components/styles/styles";

export default function FamilyScreen() {
  return (
    <View className={styles.container}>
      <FamilyPage />
    </View>
  );
}
