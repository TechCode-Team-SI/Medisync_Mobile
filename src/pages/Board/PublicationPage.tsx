import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import SearchBar from "@/src/components/SearchBar";

const PublicationPage: React.FC<{
  setHasPublications: (hasPublications: boolean) => void;
}> = ({ setHasPublications }) => {
  const router = useRouter();
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
        placeholder="Buscar en la publicación..."
      />
      <View style={{ padding: 20, flex: 1 }}>
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
      <TouchableOpacity
        onPress={() => router.back()} // Navegar a la página anterior
        style={{ padding: 10, margin: 20, backgroundColor: '#539091', borderRadius: 5, alignSelf: 'center' }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PublicationPage;
