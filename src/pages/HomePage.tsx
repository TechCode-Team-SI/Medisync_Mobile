import React, { useState} from "react";
import { Text, View} from "react-native";
import { useFocusEffect } from '@react-navigation/native'

import styles from "@/src/components/HomeComponents/stylesHome";
import ButtonsHome from "../components/HomeComponents/ButtonsHome";
import InfoHome from "../components/HomeComponents/InfoHome";
import TopBar from "../components/Navigation/TopBar";
import SideMenuModal from "../components/Navigation/SideMenuModal";


const HomePage: React.FC = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

      <View className={styles.container2}>
        <Text className={styles.title}>Hola</Text>
        <Text className={styles.title2}>Usuario</Text>
      </View>

      <View className={styles.container3}>
        <ButtonsHome />
        <InfoHome />
      </View>
    </View>
  );
};

export default HomePage;
