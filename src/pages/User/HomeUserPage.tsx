import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "@/src/components/HomeComponents/stylesHome"; // Importar estilos
import ButtonsHome from "@/src/components/HomeComponents/ButtonsHome";
import InfoHome from "@/src/components/HomeComponents/InfoHome";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { getUser } from "@/src/services/user/userServices";
import CarouselHome from "@/src/components/HomeComponents/CarouselHome";
import SearchBar from "@/src/components/SearchBar"; // Importar el componente de búsqueda

const HomeUserPage: React.FC = () => {
  const [user, setUser] = useState<{ fullName: string }>({ fullName: "" });
  const [error, setError] = useState<string | null>(null);
  const [hasPublications, setHasPublications] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.message);
      }
    };

    fetchUser();
  }, []);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
    }, [])
  );

  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <ScrollView>
        <View className={styles.container2}>
          <Text className={styles.title}>Hola,</Text>
          <Text className={styles.title2}>{user.fullName}</Text>
        </View>
        <View className={styles.container3}>
          <ButtonsHome />
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar artículos..."
          />
          {hasPublications && (
            <CarouselHome
              onUpdateHasPublications={setHasPublications}
              searchText={searchText}
            />
          )}
          <InfoHome />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeUserPage;
