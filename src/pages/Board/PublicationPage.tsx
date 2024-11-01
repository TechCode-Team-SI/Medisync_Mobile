import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import SearchBar from "@/src/components/SearchBar"; // Importar el componente

const PublicationPage: React.FC<{
  setHasPublications: (hasPublications: boolean) => void;
}> = ({ setHasPublications }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { article } = useLocalSearchParams<{ article?: string }>();
  const [articleData, setArticleData] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar title="Publicación" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar otro Articulo"
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#539091" }}>
          {articleData.title}
        </Text>
        {articleData.image && (
          <Image
            source={{ uri: articleData.image }}
            style={{ width: "100%", height: 200, marginVertical: 10 }}
          />
        )}
        <Text style={{ fontSize: 16, color: "#539091" }}>
          {articleData.description}
        </Text>
      </View>
    </View>
  );
};

export default PublicationPage;
