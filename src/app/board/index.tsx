import { View } from "react-native";
import BoardPage from "@/src/pages/Board/BoardPage";
import styles from "@/src/components/Styles/styles";

export default function BoardScreen() {
  return (
    <View className={styles.container}>
      <BoardPage />
    </View>
  );
}