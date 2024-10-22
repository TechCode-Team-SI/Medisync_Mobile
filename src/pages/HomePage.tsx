import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../components/HomeComponents/stylesHome";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomePage: React.FC = () => {

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleUs = () => {
    router.push("/aboutus");
  };

  const handleContact = () => {
    router.push("/contact");
  };

  return (
    <View className={styles.containerHome}>


      <View className={styles.mainContent}>

      <Image                                                        ////LOGO DE PRUEBA
        source={require('@/assets/images/logoCentroMedico.png')}
        className={styles.logo}
        resizeMode="contain"        
      />

        <View className={styles.containerbuttons}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleLogin}
          >
            <Text className={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View className={styles.containerbuttons}>
          <TouchableOpacity
            className={styles.buttonBorder}
            onPress={handleRegister}
          >
            <Text className={styles.buttonText2}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className={styles.containerBelow}>
        <View className={styles.iconContainer}>
          <View className={styles.iconButtonWrapper}>
            <TouchableOpacity className={styles.iconButton}
            >
              <Entypo name="images" size={26} color="#539091" />
            </TouchableOpacity>
            <Text className={styles.iconText}>Cartelera Informativa</Text>
          </View>

          <View className={styles.iconButtonWrapper}>
            <TouchableOpacity className={styles.iconButton}
            onPress={handleUs}>
              <FontAwesome name="users" size={24} color="#539091" />
            </TouchableOpacity>
            <Text className={styles.iconText}>Nuestros valores</Text>
          </View>

          <View className={styles.iconButtonWrapper}>
            <TouchableOpacity className={styles.iconButton}
            onPress={handleContact}>
              <Entypo name="info" size={26} color="#539091" />
            </TouchableOpacity>
            <Text className={styles.iconText}>Información de contacto</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
