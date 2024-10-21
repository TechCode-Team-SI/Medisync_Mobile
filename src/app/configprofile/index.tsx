import { View } from "react-native";
import ConfigProfilePage from "@/src/pages/User/ConfigProfilePage";
import styles from "@/src/components/styles/styles";

export default function ConfigProfileScreen() {
  return (
    <View className={styles.container}>
      <ConfigProfilePage />
    </View>
  );
}
