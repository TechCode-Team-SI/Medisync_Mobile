import React, { useState, useEffect } from "react";
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
import { getArticleCategories, ArticleCategory } from "@/src/services/board/boardServices";

const BoardPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getArticleCategories();
        if (result.success && Array.isArray(result.data?.data)) {
          setCategories(result.data.data);
        } else {
          console.error("Error al obtener categorías:", result.message);
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);


  const filteredByCategory = selectedCategory
    ? filteredArticles.filter(article => 
        article.categories.some(cat => cat.id === selectedCategory)
      )
    : filteredArticles;

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

        <View className="px-3 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(null); 
                console.log("Filtrar por: Todas");
              }}
              className="bg-primary rounded-full py-2 px-4 mx-2"
            >
              <Text className="text-white">Todas</Text>
            </TouchableOpacity>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => {
                    setSelectedCategory(category.id.toString()); 
                    console.log(`Filtrar por categoría: ${category.name}`);
                  }}
                  className="bg-primary rounded-full py-2 px-4 mx-2"
                >
                  <Text className="text-white">{category.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text></Text>
            )}
          </ScrollView>
        </View>

        {loading ? (
          <View className={styles.loadingContainer}>
            <Loader />
          </View>
        ) : filteredByCategory.length === 0 ? (
          <Text className={styles.noPublicationsText}>No hay publicaciones</Text>
        ) : (
          filteredByCategory.map((article, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleReadMore(article)}
              className={styles.containerArticle}
            >
              {article.image ? (
                <Image
                  source={getImageSource(article.image)}
                  style={{
                    width: "100%",
                    height: 155,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View className={styles.imagePlaceholder}>
                  <Text className={styles.description}>Imagen no disponible</Text>
                </View>
              )}
              <Text className={styles.title}>{article.title}</Text>
              <Text className={styles.dateText}>
                {new Date(article.createdAt).toLocaleDateString("es-ES")}
              </Text>
              {article.categories && article.categories.length > 0 && (
                <Text className={styles.dateText}>
                  {article.categories.map((cat) => cat.name).join(", ")}
                </Text>
              )}
              <Text numberOfLines={4} className={styles.description}>
                {article.description}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BoardPage;
