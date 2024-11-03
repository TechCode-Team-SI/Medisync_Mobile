import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import styles from "@/src/components/BoardComponents/stylesBoard";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import TopBar from "@/src/components/Navigation/TopBar";
import SearchBar from "@/src/components/SearchBar";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Article, fetchArticles } from "@/src/services/board/boardServices"; 
import Loader from "@/src/components/ui/Loader"; // Asegúrate de que la ruta sea correcta

const BoardPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // Estado para el loader
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
      setLoading(true); // Activar el loader antes de cargar
      const articlesData = await fetchArticles();
      setArticles(articlesData);
      setLoading(false); // Desactivar el loader después de cargar
    };

    loadArticles();
  }, []);

  const handleReadMore = (article: Article) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(article) },
    });
  };

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className={styles.container}>
      <TopBar title="Cartelera informativa" onLeftPress={toggleMenu} />
      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

      <ScrollView className={styles.container3} showsVerticalScrollIndicator={false}>
        <View className="items-center flex-row pt-5 pb-1 mx-3">
          <SearchBar
            placeholder="Buscar..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {loading ? ( // Mostrar loader mientras se cargan los artículos
          <View className={styles.loadingContainer}>
            <Loader />
          </View>
        ) : filteredArticles.length === 0 ? (
          <Text className={styles.noPublicationsText}>No hay publicaciones</Text>
        ) : (
          filteredArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleReadMore(article)}
              className={styles.container6}
            >
              {article.image && typeof article.image === "string" ? (
                <Image source={{ uri: article.image }} className={styles.image} />
              ) : (
                <View className={styles.imagePlaceholder}>
                  <Text className={styles.description}>
                    La imagen no está disponible
                  </Text>
                </View>
              )}
              <Text className={styles.title}>{article.title || ""}</Text>
              <Text className={styles.dateText}>
                {new Date(article.createdAt).toLocaleDateString("es-ES")}
              </Text>
              <Text className={styles.description}>
                {article.description || ""}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BoardPage;
