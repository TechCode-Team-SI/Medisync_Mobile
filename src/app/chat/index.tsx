import { View } from "react-native";
import SupportChatPage from "@/src/pages/Support/SupportChatPage";
import styles from "@/src/components/Styles/styles";

export default function ChatScreen() {
  return (
    <View className={styles.container}>
      <SupportChatPage />
    </View>
  );
}
