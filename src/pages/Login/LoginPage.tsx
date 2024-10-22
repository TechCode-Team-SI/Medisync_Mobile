import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity} from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import AlertModal from '@/src/components/Modal/AlertModal';
import InfoModal from '@/src/components/Modal/InfoModal';

import { login } from "@/src/services/auth/authServices"

const LoginPage: React.FC = () => {

  const [inputEmail, setInputEmail] = useState(""); 
  const [inputPassword, setInputPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = inputEmail !== '' && inputPassword !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [inputEmail, inputPassword]);

  useFocusEffect(
    React.useCallback(() => {
      setInputEmail('');
      setInputPassword('');
    }, [])
  );

  const handleLogin = async () => {
    const result = await login(inputEmail, inputPassword);

    if (result.success) {
      setShowSuccessModal(true);
      
      router.replace('/homeuser'); 
    } else {
      setModalMessage(result.message);
      setShowErrorModal(true);
    }
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>¡Bienvenido de vuelta!</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>Inicia sesión para continuar</Text>

        <View className={styles.inputContainer}>
          <Entypo name="mail" size={24} color="#539091" />
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
            placeholder="Contraseña"
            placeholderTextColor="#539091"
            value={inputPassword}
            onChangeText={setInputPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={24}
              color="#539091"
            />
          </TouchableOpacity>
        </View>

        <Link href="/forgot" className={styles.textButton}>
          ¿Ha olvidado su contraseña?
        </Link>

        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleLogin}
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
          >
            <Text className={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View className={styles.container3}>
          <Text>¿No tienes una cuenta?</Text>
          <Link href="/register" className={styles.textButton2}>
            Registrate
          </Link>
        </View>

        <InfoModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Bienvenido!"
        />

        <AlertModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />

      </View>
    </View>
  );
};

export default LoginPage;
