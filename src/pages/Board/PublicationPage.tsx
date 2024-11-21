import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";

import styles from "@/src/components/BoardComponents/stylesBoard";
import { formatArticleDate } from "@/src/utils/board/articleUtils"; 
import TopBarBack from "@/src/components/Navigation/TopBarBack";

const PublicationPage: React.FC<{
  setHasPublications: (hasPublications: boolean) => void;
}> = ({ setHasPublications }) => {
  const { article } = useLocalSearchParams<{ article?: string }>();
  const [articleData, setArticleData] = useState<any>(null);

  useEffect(() => {
    if (typeof article === "string") {
      setArticleData(JSON.parse(article));
    }
  }, [article]);

  if (!articleData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Cargando artículo...</Text>
      </View>
    );
  }

  const formattedDate = formatArticleDate(articleData.createdAt); 

  return (
    <SafeAreaView className={styles.safeArea}>
      <StatusBar backgroundColor="#A8DCD9" barStyle="light-content" />
      <ScrollView className={styles.publicationContainer} showsVerticalScrollIndicator={false}>
        <TopBarBack title="Publicación" />

        {articleData.image ? (
          <Image source={{ uri: articleData.image }} className={styles.publicationImage} />
        ) : (
          <View className={styles.imagePlaceholder2}>
            <Text className={styles.description}>Imagen no disponible</Text>
          </View>
        )}

        <View className="">
          <View className={styles.container2}>
            <Text className={styles.publicationTitle}>{articleData.title}</Text>
            <Text className={styles.publicationDate}>{formattedDate}</Text>
              {articleData.categories && articleData.categories.length > 0 && (
                <Text className={styles.publicationDate}>
                  Categorías: {articleData.categories.map((cat: { name: string }) => cat.name).join(", ")}.
                </Text>
            )}

            <Text className={styles.publicationDescription}>{articleData.description}</Text>


          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicationPage;
