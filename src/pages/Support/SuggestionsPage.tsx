import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import SideMenuModal from "@/src/components/navigation/SideMenuModal";
import TopBar from "@/src/components/navigation/TopBar";
import { useFocusEffect } from '@react-navigation/native'
import styles from "@/src/components/SupportComponents/stylesSupport";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SuggestionPage: React.FC = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

  const handle1 = () => {
  };
  const handle2 = () => {
  };
  const handle3 = () => {
  };
  const handle4 = () => {
  };

  return (
    <View className={styles.container}>
      <TopBar title="Sugerencias" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

          <View className={styles.container3}>
            <MaterialCommunityIcons name="headset" size={100} color="#539091" />

            <Text className={styles.title1}>¿Tienes alguna idea? Compártela con nosotros.</Text>

          </View>

          <View className={styles.container4}>

            <Text className={styles.text2}>Título</Text>
                <View className={styles.containerInput}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                />
                </View>

            <Text className={styles.text3}>Descripción</Text>
                <View className={styles.containerInput2}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                />
                </View>
                
                <TouchableOpacity
                  className={styles.button1}
                  >
                  <Text className={styles.buttonText1}>Crear</Text>
                </TouchableOpacity>
          </View>




    </View>
  );
};

export default SuggestionPage;