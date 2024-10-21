import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/AboutUsComponents/stylesUs";
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import InfoHome from '@/src/components/HomeComponents/InfoHome';

const ContactPage: React.FC = () => {

    const navigation = useNavigation();  

    const handleBack = () => {
        navigation.goBack();  
    };

  return (
    <View className={styles.container}>

      <TouchableOpacity className={styles.backButton} onPress={handleBack}>
        <Entypo name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <Text className={styles.title1}>Información de contacto</Text>

      <View className={styles.containerBg}>

        <InfoHome />

      </View>

    </View>
  );
};

export default ContactPage;