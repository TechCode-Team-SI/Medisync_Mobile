import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import styles from "@/src/components/BoardComponents/stylesBoard"; 
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import TopBar from "@/src/components/Navigation/TopBar";
import SearchBar from "@/src/components/SearchBar"; 
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

const BoardPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
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
    const fetchArticles = async () => {
      const response = await fetch("https://chengkev.online/api/v1/articles");
      const json = await response.json();
      if (Array.isArray(json.data)) {
        setArticles(json.data);
      }
    };

    fetchArticles();
  }, []);

  const handleReadMore = (article: any) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(article) },
    });
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TopBar title="Cartelera informativa" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <SearchBar
        placeholder="Buscar artículos..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView style={styles.container3}>
        {filteredArticles.map((article, index) => {
          console.log("Article data:", article);

          return (
            <View key={index} style={styles.container6}>
              <Text style={styles.title3}>{article.title}</Text>
              {article.image && typeof article.image === "string" ? (
                <Image source={{ uri: article.image }} style={styles.image} />
              ) : (
                <Text style={styles.description}>
                  La imagen no está disponible
                </Text>
              )}
              <Text style={styles.description}>{article.description}</Text>
              <TouchableOpacity onPress={() => handleReadMore(article)}>
                <Text style={styles.readMoreText}>Leer más</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BoardPage;
