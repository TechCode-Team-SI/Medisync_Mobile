import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SearchPage: React.FC = () => {
    const handleSelect = () => {};

    return (
        <View className={styles.container1}>

         <ButtonBack/>
         <Text className={styles.title1}> Servicios</Text>

          <View className={styles.containerBg1}>

          <Text className={styles.title2}> Especialidad</Text>
          <View className={styles.containerGrid}>
            
          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
             <MaterialIcons name="route" size={24} color="#539091"/>
            <Text className={styles.buttonText}>Angiologia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
             <FontAwesome5 name="heartbeat" size={24} color="#539091"  />
            <Text className={styles.buttonText}>Cardiologia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
            <FontAwesome5 name="notes-medical" size={24} color="#539091" />
            <Text className={styles.buttonText}>Cirugía</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <MaterialCommunityIcons name="head" size={24} color="#539091"/>
            <Text className={styles.buttonText}>Dermatología</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <Foundation name="female-symbol" size={24} color="#539091" />
            <Text className={styles.buttonText}>Ginecología</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <FontAwesome5 name="brain" size={24} color="#539091" />
            <Text className={styles.buttonText}>Neurología</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <SimpleLineIcons name="eyeglass" size={24} color="#539091" />
            <Text className={styles.buttonText}>Oftalmología</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <FontAwesome5 name="baby" size={24} color="#539091"/>
            <Text className={styles.buttonText}>Pediatria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button}
            onPress={handleSelect}>
              <Foundation name="male-symbol" size={24} color="#539091" />
            <Text className={styles.buttonText}>Urología</Text>
          </TouchableOpacity>

          </View>

          </View>
          
          
          </View>
      );
};

export default SearchPage;