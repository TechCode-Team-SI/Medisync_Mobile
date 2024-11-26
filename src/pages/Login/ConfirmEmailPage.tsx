import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '@/src/components/LoginComponents/stylesLogin';
import { Link, router } from "expo-router";
import { confirmCodeEmail } from "@/src/services/auth/confirmEmailServices";
import { login } from '@/src/services/auth/authServices';
import AlertModal from '@/src/components/Modal/AlertModal';
import FormField from "@/src/components/Forms/FormField";
import CustomButton from '@/src/components/ui/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoModal from '@/src/components/Modal/InfoModal';

const ConfirmEmailPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setSuccessShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = code !== '';
    setIsButtonDisabled(!allFieldsFilled);
  }, [code]);

  const handleconfirmCode = async () => {
    try {
      const confirmResponse = await confirmCodeEmail(code);

      if (confirmResponse.success) {
        const loginResponse = await loginAfterConfirm();

        if (loginResponse.success) {
          setModalMessage('Correo confirmado con éxito. Iniciando sesión...');
          setSuccessShowModal(true);

          setTimeout(() => {
            router.replace('/homeuser');
          }, 1500);
        } else {
          setModalMessage(loginResponse.message || 'Error al iniciar sesión.');
          setShowModal(true);
        }
      } else {
        setModalMessage(confirmResponse.message || 'Código inválido. Inténtalo de nuevo.');
        setShowModal(true);
      }
    } catch (error: any) {
      setModalMessage('Error al verificar el código. Inténtalo de nuevo.');
      setShowModal(true);
    }
  };

  const loginAfterConfirm = async () => {
    try {
      const email = await AsyncStorage.getItem("confirmEmail");
      const password = await AsyncStorage.getItem("userPassword");

      if (!email || !password) {
        return { success: false, message: 'Falta el correo o la contraseña.' };
      }

      const loginResponse = await login(email, password); 

      return loginResponse;
    } catch (error) {
      return { success: false, message: 'Error al intentar iniciar sesión.' };
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>Confirmar Correo Eléctrónico</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>
          Por favor, ingrese el código que le hemos enviado a su correo electrónico para confirmar su cuenta.
        </Text>
        
        <FormField
          icon="lock"
          placeholder="Código"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />

        <CustomButton
          onPress={handleconfirmCode}
          disabled={isButtonDisabled}
          title="Verificar"
        />

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
      <InfoModal
          visible={showSuccessModal}
          onClose={() => setSuccessShowModal(false)}
          title="Correo confirmado exitosamente."
          message="¡Bienvenido!"
        />
      </View>
    </View>
  );
};

export default ConfirmEmailPage;

