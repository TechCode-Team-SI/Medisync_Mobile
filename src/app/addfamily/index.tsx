import { View } from "react-native";
import AddFamilyPage from "@/src/pages/User/AddFamilyPage";
import styles from "@/src/components/styles/styles";

export default function AddFamilyScreen() {
  return (
    <View className={styles.container}>
      <AddFamilyPage />
    </View>
  );
}
