import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  disabled?: boolean; 
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, disabled = false, title }) => {
  return (
    <View className="justify-center items-center mt-2 mb-6">
      <TouchableOpacity
        className="w-full h-12 items-center justify-center bg-primary rounded-xl"
        onPress={onPress}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <Text className="text-white text-lg font-montserrat">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

