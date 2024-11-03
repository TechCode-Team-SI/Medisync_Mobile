import React, { useEffect, useState } from "react";
import { Text, View, ScrollView} from "react-native";
import { useFocusEffect } from '@react-navigation/native'

import styles from "@/src/components/HomeComponents/stylesHome";
import ButtonsHome from "@/src/components/HomeComponents/ButtonsHome";
import InfoHome from "@/src/components/HomeComponents/InfoHome";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";

import useFetchUser from "@/src/services/user/useFetchUser";

import CarouselHome from "@/src/components/HomeComponents/CarouselHome";


const HomeUserPage: React.FC = () => {

    const { user } = useFetchUser();

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

    const [hasPublications, setHasPublications] = useState(true);
    const [searchText, setSearchText] = useState("");

  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
        
      <ScrollView>

      <View className={styles.container2}>
        <Text className={styles.title}>Hola,</Text>
        <Text className={styles.title2}>{user.fullName}</Text>
      </View>

      <View className={styles.container3}>

        <ButtonsHome />

        <View className={styles.spacingBetweenSections} />

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
