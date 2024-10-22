import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from "@/src/components/Styles/styles"; 

type IconName = "mail" | "user" | "phone" | "lock" | "v-card" | "eye" | "eye-with-line";

interface FormFieldProps {
  icon: IconName;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; 
  secureTextEntry?: boolean; 
}

const FormField: React.FC<FormFieldProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View className={styles.inputContainer}>
      <Entypo name={icon} size={24} color="#539091" />
      <TextInput
        className={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#539091"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default FormField;


