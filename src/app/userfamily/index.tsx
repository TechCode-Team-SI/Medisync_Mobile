import { View } from "react-native";
import UserFamilyPage from "@/src/pages/User/UserFamilyPage";
import styles from "@/src/components/styles/styles";

export default function UserFamilyScreen() {
  return (
    <View className={styles.container}>
      <UserFamilyPage />
    </View>
  );
}
