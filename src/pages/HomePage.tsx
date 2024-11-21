import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../components/HomeComponents/stylesHome";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomePage: React.FC = () => {
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const buttons = [
    { label: "Iniciar Sesión", onPress: () => navigateTo("/login"), style: styles.button, textStyle: styles.buttonText },
    
    { label: "Regístrate", onPress: () => navigateTo("/register"), style: styles.buttonBorder, textStyle: styles.buttonText2 }
  ];

  const icons = [
    { icon: <Entypo name="images" size={26} color="#539091" />, 
    label: "Cartelera Informativa", onPress: () => navigateTo("/board") },

    { icon: <FontAwesome name="users" size={24} color="#539091" />, 
    label: "Nuestros valores", onPress: () => navigateTo("/aboutus") },

    { icon: <Entypo name="info" size={26} color="#539091" />, 
    label: "Información de contacto", onPress: () => navigateTo("/contact") }
  ];

  return (
    <View className={styles.containerHome}>
      <View className={styles.mainContent}>
        <Image
          source={require('@/assets/images/logoCentroMedico.png')}
          className={styles.logo}
          resizeMode="contain"
        />
        {buttons.map((button, index) => (
          <View key={index} className={styles.containerbuttons}>
            <TouchableOpacity className={button.style} onPress={button.onPress}>
              <Text className={button.textStyle}>{button.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className={styles.containerBelow}>
        <View className={styles.iconContainer}>
          {icons.map((icon, index) => (
            <View key={index} className={styles.iconButtonWrapper}>
              <TouchableOpacity className={styles.iconButton} onPress={icon.onPress}>
                {icon.icon}
              </TouchableOpacity>
              <Text className={styles.iconText}>{icon.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomePage;
