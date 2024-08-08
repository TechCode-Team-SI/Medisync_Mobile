import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/styled-components/stylesHome"
import TopBar from '../components/TopBar';


const HomePage: React.FC = () => {
  return (
    <View className={styles.container}>
        <TopBar
            title="Inicio"
            onLeftPress={() => console.log('Left pressed')}/ 
        >
        
        <View className={styles.container2}>
            <Text className={styles.title}>
                Hola
            </Text>
            <Text className={styles.title2}>
                Usuario
            </Text>
        </View>

        <View className={styles.container3}>
        </View>

    </View>
  );
};

export default HomePage;
