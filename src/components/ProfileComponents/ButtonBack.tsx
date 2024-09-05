import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './stylesProfile';
import Entypo from '@expo/vector-icons/Entypo';

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  color?: string;
  padding?: string;
}

const ButtonsHome: React.FC = ( ) => {
    const handleBack = () => {};

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