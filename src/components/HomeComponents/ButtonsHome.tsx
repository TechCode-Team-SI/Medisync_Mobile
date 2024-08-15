import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './stylesHome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ButtonsHome: React.FC = () => {
  return (
    <View className={styles.containerButtons}>

      <View className={styles.containerGrid}>

        <TouchableOpacity
            className={styles.button1}
        >
            <Ionicons name="calendar" size={48} color="white" />
            <Text className={styles.text}>Agenda tu cita</Text>
        </TouchableOpacity>
        <TouchableOpacity
            className={styles.button2}
        >
            <Text className={styles.text2}>Perfil</Text>
        </TouchableOpacity>
        
      </View>

      <View className={styles.containerGrid}>

      <TouchableOpacity
            className={styles.button3}
        >
            <Text className={styles.text2}>Valores</Text>
        </TouchableOpacity>
        <TouchableOpacity
            className={styles.button4}
        >            
            <Text className={styles.text}>Soporte</Text>
            <MaterialCommunityIcons name="headset" size={48} color="white" />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default ButtonsHome;