import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './stylesProfile';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  color?: string;
  padding?: string;
}

const ButtonsHome: React.FC = ( ) => {

    const navigation = useNavigation(); 

    const handleBack = () => {
      navigation.goBack();  
    };

    return (
    <View className={styles.containerBack}>
          <TouchableOpacity
            className= {styles.buttonBack1}
            onPress={handleBack}>
              <Entypo name="chevron-left" size={24} color="#FFFFFF"></Entypo>
          </TouchableOpacity>
          </View>
          
  );
};

export default ButtonsHome;