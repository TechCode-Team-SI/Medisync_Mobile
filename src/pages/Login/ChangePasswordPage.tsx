import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '@/src/components/LoginComponents/stylesLogin';
import { Link, router } from "expo-router";

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginNavigation = () => {
  };

  const handleChangePassword = () => {
  };

  return (
    <View className={styles.container}>

      <Text className={styles.title1}>Cambiar Contraseña</Text>

      <View className={styles.containerBelow}>

        <Text className={styles.title2}>La nueva contraseña debe ser diferente a la utilizada anteriormente.</Text>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Nueva Contraseña"
            placeholderTextColor="#539091"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Entypo name={showNewPassword ? "eye-with-line" : "eye"} size={24} color="#539091" />
          </TouchableOpacity>
        </View>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#539091"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Entypo name={showConfirmPassword ? "eye-with-line" : "eye"} size={24} color="#539091" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={styles.button}
          onPress={handleChangePassword}
        >
          <Text className={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
        
        <View className={styles.container7}>
          <Link href="/login" className={styles.textButton2}>
            Iniciar Sesión
          </Link>
        </View>

      </View>

    </View>
  );
};

export default ChangePasswordPage;