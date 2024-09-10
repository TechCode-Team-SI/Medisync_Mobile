import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from "expo-router";

import styles from "@/src/components/LoginComponents/stylesLogin"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    router.push("/codepassword");
  };

  const handleLoginNavigation = () => {
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>¿Olvidaste tu Contraseña?</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>
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

        <View className={styles.container4}>
          <TouchableOpacity onPress={handleForgotPassword} className={styles.button}>
            <Text className={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View className={styles.container6}>
          <Link href="/login" className={styles.textButton2}>
            Iniciar Sesión
          </Link>
        </View>


      </View>

    </View>
  );
};

export default ForgotPasswordPage;