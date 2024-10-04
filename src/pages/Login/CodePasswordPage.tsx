import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '@/src/components/LoginComponents/stylesLogin';
import { Link, router } from "expo-router";

const CodePasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');

  const handleForgotPassword = () => {

  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>Ingresar Código</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>
           Por favor, ingrese el código que le hemos enviado a su correo electrónico.
        </Text>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Código"
            placeholderTextColor="#539091"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} 
          />
        </View>

        <View className={styles.container4}>
          <TouchableOpacity onPress={handleForgotPassword} className={styles.button}>
            <Text className={styles.buttonText}>Verificar</Text>
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

export default CodePasswordPage;


