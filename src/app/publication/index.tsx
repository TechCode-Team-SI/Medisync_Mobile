import React, { useState } from "react";
import { View } from "react-native";
import PublicationPage from "@/src/pages/Board/PublicationPage";
import styles from "@/src/components/Styles/styles";

export default function PublicationScreen() {
  const [hasPublications, setHasPublications] = useState<boolean>(false);
  return (
    <View className={styles.container}>
      <PublicationPage setHasPublications={setHasPublications} />
    </View>
  );
}
