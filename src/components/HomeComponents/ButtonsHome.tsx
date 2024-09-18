import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './stylesHome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";

const ButtonsHome: React.FC = () => {

  const handleUs = () => {
    router.push("/aboutus");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleSearch = () => {
    router.push("/search");
  };
  const handleSupport = () => {
    router.push("/support"); 
  };

  return (
    <View className={styles.containerButtons}>

      <View className={styles.containerGrid}>

        <TouchableOpacity
            className={styles.button1}
            onPress={handleSearch}
        >
            <Ionicons name="calendar" size={48} color="white" />
            <Text className={styles.text}>Agenda tu cita</Text>
        </TouchableOpacity>

        <TouchableOpacity
            className={styles.button2}
            onPress={handleProfile}
        >
            <Text className={styles.text2}>Perfil</Text>
        </TouchableOpacity>
        
      </View>

      <View className={styles.containerGrid}>

        <TouchableOpacity
            className={styles.button3}
            onPress={handleUs}
        >
            <Text className={styles.text2}>Nosotros</Text>
        </TouchableOpacity>

        <TouchableOpacity
            className={styles.button4}
            onPress={handleSupport}
        >            
            <Text className={styles.text}>Soporte</Text>
            <MaterialCommunityIcons name="headset" size={48} color="white" />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default ButtonsHome;