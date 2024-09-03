import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/ForgotComponents/stylesForgot';
import Entypo from '@expo/vector-icons/Entypo';

const CodigoPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');

  const handleForgotPassword = () => {
  };

  const handleLoginNavigation = () => {
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>Ingresar Código</Text>

      <View className={styles.containerForgotPassword}>
        <Text className={styles.title3}>
           Por favor, ingrese el código que te hemos enviado al correo electrónico que nos has proporcionado. 
        </Text>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            style={styles.input}
            placeholder="Codigo"
            placeholderTextColor="#539091"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} 
          />
        </View>

        <TouchableOpacity onPress={handleForgotPassword} className={styles.button}>
          <Text className={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLoginNavigation} className={styles.loginTextButton}>
        <Text className={styles.loginTextButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

  
    </View>
  );
};

export default CodigoPasswordPage;



