import { View } from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";

import ConfigProfilePage from "@/src/pages/User/ConfigProfilePage";

export default function HomeScreen() {
  return (
      <View className={styles.container}>
          <ConfigProfilePage/>
      </View>
  );
}
