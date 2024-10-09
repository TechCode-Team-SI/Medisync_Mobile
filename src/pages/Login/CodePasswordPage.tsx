import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '@/src/components/LoginComponents/stylesLogin';
import { Link, router } from "expo-router";

import { confirmCode } from "@/src/services/auth/authServices";
import AlertModal from '@/src/components/Modal/AlertModal';


const CodePasswordPage: React.FC = () => {

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = code !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [code]);

  const handleconfirmCode = async () => {
    const result = await confirmCode(code);  
  
    if (result.success) {
      console.log('Código válido');
      router.push("/changepassword"); 
    } else {
      console.log('Error:', result.message);
      setModalMessage(result.message);
      setShowModal(true);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
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
            value={code}
            onChangeText={setCode}
            secureTextEntry={true} 
          />
        </View>

        <View className={styles.container4}>
          <TouchableOpacity 
          onPress={handleconfirmCode} 
          className={styles.button}
          disabled={isButtonDisabled}
          style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>
            <Text className={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        </View>

        <View className={styles.container6}>
          <Link href="/login" className={styles.textButton2}>
            Iniciar Sesión
          </Link>
        </View>

        <AlertModal
          visible={showModal}
          onClose={handleModalClose}
          title="ATENCIÓN"
          message={modalMessage}
        />

      </View>

    </View>
  );
};

export default CodePasswordPage;


