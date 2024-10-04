import { View } from "react-native";
import ProfilePage from "@/src/pages/User/ProfilePage";
import styles from "@/src/components/Styles/styles";

export default function ProfileScreen() {
  return (
    <View className={styles.container}>
      <ProfilePage />
    </View>
  );
}
