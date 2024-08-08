import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/LoginComponents/stylesLogin"

import Entypo from '@expo/vector-icons/Entypo';

const LoginPage: React.FC = () => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
  };
  const handleRegister = () => {
  };

  return (
    <View className={styles.container}>

      <Text className={styles.title1}>¡Bienvenido de vuelta!</Text>

      <View className={styles.containerLogin}>

        <Text className={styles.title2}> Inicia sesión para continuar</Text>

        <View className={styles.inputContainer}>
          <Entypo name="mail" size={24} color="#539091"/>
          <TextInput
          className={styles.input}
          placeholder="Email"
          placeholderTextColor="#539091"
          value={inputEmail}
          onChangeText={setInputEmail}
          />
        </View>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Password"
            placeholderTextColor="#539091"
            value={inputPassword}
            onChangeText={setInputPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color="#539091" />
          </TouchableOpacity>
        </View>
            
        <TouchableOpacity>
          <Text className={styles.textButton}>¿Ha olvidado su contraseña?</Text>
        </TouchableOpacity>

        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleLogin}
          >
            <Text className={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View className={styles.container3}>
          <Text>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text className={styles.textButton2}>Registrate</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

export default LoginPage;
