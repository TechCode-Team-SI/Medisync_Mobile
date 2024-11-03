import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import styles from "@/src/components/BoardComponents/stylesBoard";
import { formatArticleDate } from "@/src/services/board/boarUtils"; 

const PublicationPage: React.FC<{
  setHasPublications: (hasPublications: boolean) => void;
}> = ({ setHasPublications }) => {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { article } = useLocalSearchParams<{ article?: string }>();
  const [articleData, setArticleData] = useState<any>(null);

  useEffect(() => {
    if (typeof article === "string") {
      setArticleData(JSON.parse(article));
    }
  }, [article]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  if (!articleData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando artículo...</Text>
      </View>
    );
  }

  const formattedDate = formatArticleDate(articleData.createdAt); 

  return (
    <View className={styles.publicationContainer}>
      <TopBar title="Publicación" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View className={styles.container2}>

        <View style={{ padding: 20, flex: 1 }}>
          <Text className={styles.publicationTitle}>{articleData.title}</Text>
          <Text className={styles.publicationDate}>{formattedDate}</Text>
          {articleData.image && (
            <Image source={{ uri: articleData.image }} className={styles.publicationImage} />
          )}
          <Text className={styles.publicationDescription}>{articleData.description}</Text>
        </View>

      </View>

    </View>
  );
};

export default PublicationPage;
