import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/HomeComponents/stylesHome"
import TopBar from '../components/TopBar';
import SideMenu from '../components/SideMenu';


const Prueba: React.FC = () => {
  return (
    <View className={styles.container}>
        <SideMenu/>
      

    </View>
  );
};

export default Prueba;
