import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../LoginComponents/stylesLogin';

interface PasswordFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder, value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={styles.inputContainer}>
      <Entypo name="lock" size={24} color="#539091" />
      <TextInput
        className={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#539091"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color="#539091" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;
