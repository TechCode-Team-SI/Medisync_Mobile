import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/ForgotComponents/stylesForgot';
import Entypo from '@expo/vector-icons/Entypo';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
  };

  const handleLoginNavigation = () => {
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>¿Olvidaste tu Contraseña?</Text>

      <View className={styles.containerForgotPassword}>
        <Text className={styles.title3}>
          Introduce tu correo electrónico y te enviaremos un enlace para que vuelvas a entrar en tu cuenta.
        </Text>

        <View className={styles.inputContainer}>
          <Entypo name="mail" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Email"
            placeholderTextColor="#539091"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity onPress={handleForgotPassword} className={styles.button}>
          <Text className={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLoginNavigation} className={styles.loginTextButton}>
        <Text className={styles.loginTextButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

    
    </View>
  );
};

export default ForgotPasswordPage;
