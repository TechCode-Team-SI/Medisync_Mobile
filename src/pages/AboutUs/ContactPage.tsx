import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/AboutUsComponents/stylesUs";
import InfoHome from '@/src/components/HomeComponents/InfoHome';
import ButtonBack from "@/src/components/Navigation/ButtonBack"

const ContactPage: React.FC = () => {

  return (
    <View className={styles.container}>
      
      <ButtonBack buttonColor="#5DA9A3" />

      <Text className={styles.title1}>Información de contacto</Text>

      <View className={styles.containerBg2}>

        <InfoHome />

      </View>

    </View>
  );
};

export default ContactPage;