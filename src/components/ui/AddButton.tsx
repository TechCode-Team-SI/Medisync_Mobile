import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddButtonProps {
  onPress: () => void;        
  buttonStyle?: string;       
  iconSize?: number;          
  iconColor?: string;         
}

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  buttonStyle = 'bg-primary p-2 rounded-full',
  iconSize = 30,
  iconColor = 'white',
}) => {
  return (
    <TouchableOpacity
      className={buttonStyle}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons name="add" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default AddButton;

