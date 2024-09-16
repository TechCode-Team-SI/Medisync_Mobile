import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SearchDrPage: React.FC = () => {
    const handleSelect = () => {};

    return (
        <View className={styles.container1}>

         <ButtonBack/>
         <Text className={styles.title1}>Cardiología</Text>

          <View className={styles.containerBg2}>

          <Text className={styles.title2}> Especialistas Disponibles</Text>

          <View className={styles.container}>
          <TouchableOpacity
            className={styles.button2}
            onPress={handleSelect}>
             <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. Lorem Ipsum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button2}
            onPress={handleSelect}>
             <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. Lorem Ipsum</Text>
          </TouchableOpacity>
          </View>

          </View>
          </View>
      );
};

export default SearchDrPage;