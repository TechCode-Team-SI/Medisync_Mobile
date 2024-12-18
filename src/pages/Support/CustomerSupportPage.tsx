import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import TopBar from "@/src/components/Navigation/TopBar";
import { useFocusEffect } from '@react-navigation/native'
import styles from "@/src/components/SupportComponents/stylesSupport";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";

const CustomerSupportPage: React.FC = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

  const handleSuggestion = () => {
    router.push("/suggestions"); 
  };
  const handleClaims = () => {
    router.push("/claims"); 
  };
  const handleHistory = () => {
    router.push("/supporthistory"); 
  };

  return (
    <View className={styles.container}>
      <TopBar title="Soporte al cliente" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

          <View className={styles.container3}>
            <MaterialCommunityIcons name="headset" size={100} color="#539091" />

            <Text className={styles.title1}>¿En qué podemos ayudarte?</Text>
            <Text className={styles.text}>¡Nos importa tu opinión! Elige una opción:</Text>

          </View>

        <View className={styles.container2}>

          <TouchableOpacity
              className={styles.button}
              onPress={handleSuggestion}>
                    <View className={styles.icon}>
                    <Entypo name='pencil' size={24} color="#539091" ></Entypo>
                    </View>
              <Text className={styles.buttonText}>Sugerencias</Text>
            </TouchableOpacity>
          </View>

          <View className={styles.container2}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleClaims}>
                    <View className={styles.icon}>
                    <Entypo name='megaphone' size={24} color="#539091" ></Entypo>
                    </View>
                <Text className={styles.buttonText}>Reclamos</Text>
              </TouchableOpacity>
          </View>

          <View className={styles.container2}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleHistory}>
                  <View className={styles.icon}>
                    <Entypo name='list' size={24} color="#539091" ></Entypo>
                  </View>
                <Text className={styles.buttonText}>Historial</Text>
              </TouchableOpacity>
          </View>

    </View>
  );
};

export default CustomerSupportPage;