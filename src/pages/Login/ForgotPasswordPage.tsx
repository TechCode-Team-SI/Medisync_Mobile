import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from "expo-router";
import styles from "@/src/components/LoginComponents/stylesLogin";
import { forgotPassword } from "@/src/services/auth/authServices";
import AlertModal from '@/src/components/Modal/AlertModal';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const handleForgotPassword = async () => {
    const result = await forgotPassword(email);
    
    if (result.success) {
      console.log('Correo enviado correctamente');
      setModalMessage("Se ha enviado a tu dirección de correo electrónico un mensaje con instrucciones para restablecer la contraseña.");
      setShowModal(true);
    } else {
      console.log('Error:', result.message);
      setModalMessage(result.message);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage.includes("instrucciones para restablecer la contraseña")) {
      router.push("/codepassword"); 
    }
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

export default ForgotPasswordPage;
