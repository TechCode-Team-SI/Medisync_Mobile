import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import styles from "@/src/components/BoardComponents/stylesBoard";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import TopBar from "@/src/components/Navigation/TopBar";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import SearchBar from "@/src/components/ui/SearchBar";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "@/src/components/ui/Loader";
import { getToken } from "@/src/services/auth/sessionServices";
import { useArticles } from "@/src/hooks/board/useArticles";
import { useHandleReadMore } from "@/src/hooks/board/useHandleReadMore";
import { getImageSource } from "@/src/utils/board/articleUtils";

const BoardPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { loading, filteredArticles } = useArticles(searchText);
  const handleReadMore = useHandleReadMore();

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
      const checkLoginStatus = async () => {
        const token = await getToken();
        setIsLoggedIn(!!token);
      };
      checkLoginStatus();
    }, [])
  );

  return (
    <View className={styles.container}>
      {isLoggedIn ? (
        <TopBar title="Cartelera informativa" onLeftPress={toggleMenu} />
      ) : (
        <TopBarBack title="Cartelera informativa" backgroundColor="#539091" textColor="#ffff" iconColor="#ffff" />
      )}
      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

      <ScrollView className={styles.container3} showsVerticalScrollIndicator={false}>
        <View className="items-center flex-row pt-5 pb-1 mx-3">
          <SearchBar placeholder="Buscar..." value={searchText} onChangeText={setSearchText} />
        </View>

        {loading ? (
          <View className={styles.loadingContainer}>
            <Loader />
          </View>
        ) : filteredArticles.length === 0 ? (
          <Text className={styles.noPublicationsText}>No hay publicaciones</Text>
        ) : (
          filteredArticles.map((article, index) => (
            <TouchableOpacity key={index} onPress={() => handleReadMore(article)} className={styles.containerArticle}>
              {article.image ? (
                <Image source={getImageSource(article.image)} style={{ width: "100%", height: 155, borderRadius: 10 }} />
              ) : (
                <View className={styles.imagePlaceholder}>
                  <Text className={styles.description}>Imagen no disponible</Text>
                </View>
              )}
              <Text className={styles.title}>{article.title}</Text>
              <Text className={styles.dateText}>{new Date(article.createdAt).toLocaleDateString("es-ES")}</Text>
              <Text numberOfLines={4} className={styles.description}>{article.description}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BoardPage;
