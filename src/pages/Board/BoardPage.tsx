import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import styles from "@/src/components/BoardComponents/stylesBoard";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import TopBar from "@/src/components/Navigation/TopBar";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import SearchBar from "@/src/components/SearchBar";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Article, fetchArticles } from "@/src/services/board/boardServices";
import Loader from "@/src/components/ui/Loader";
import { getToken } from "@/src/services/auth/sessionServices";

const BoardPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
    }, [])
  );

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const articlesData = await fetchArticles();
      setArticles(articlesData);
      setLoading(false);
    };

    const checkLoginStatus = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    loadArticles();
  }, []);

  const handleReadMore = (article: Article) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(article) },
    });
  };

  const getImageSource = (imageUrl: string) => {
    if (!imageUrl) {
      console.log("Image URL is invalid or empty");
      return undefined; 
    }
    console.log("Image URL:", imageUrl); 
    return { uri: imageUrl }; 
  };

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className={styles.container}>
      {isLoggedIn ? (
        <TopBar title="Cartelera informativa" onLeftPress={toggleMenu} />
      ) : (
        <TopBarBack
          title="Cartelera informativa"
          backgroundColor="#539091"
          textColor="#ffff"
          iconColor="#ffff"
        />
      )}
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <ScrollView
        className={styles.container3}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center flex-row pt-5 pb-1 mx-3">
          <SearchBar
            placeholder="Buscar..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {loading ? (
          <View className={styles.loadingContainer}>
            <Loader />
          </View>
        ) : filteredArticles.length === 0 ? (
          <Text className={styles.noPublicationsText}>
            No hay publicaciones
          </Text>
        ) : (
          filteredArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleReadMore(article)}
              className={styles.container6}
            >
              {article.image && typeof article.image === "string" ? (
                <Image
                  source={getImageSource(article.image)} 
                  style={{ width: "100%", height: 200, borderRadius: 10 }} // Hago esto aqui porque sino no muestra la imagen jajaja
                />
              ) : (
                <View className={styles.imagePlaceholder}>
                  <Text className={styles.description}>
                    La imagen no está disponible
                  </Text>
                </View>
              )}
              <Text className={styles.title}>{article.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BoardPage;
