import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

interface ButtonBackProps {
  buttonColor?: string; 
}

const ButtonBack: React.FC<ButtonBackProps> = ({ buttonColor = '#5DA9A3' }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex justify-start w-3/12 p-7 mt-4">
      <TouchableOpacity
        className='absolute top-8 left-4 z-10 w-[32px] h-[46px] items-center justify-center rounded'
        style={{ backgroundColor: buttonColor }} 
        onPress={handleBack}>
        <Entypo name="chevron-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBack;
