import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '@/src/components/LoginComponents/stylesLogin';
import AlertModal from '@/src/components/Modal/AlertModal';
import { Link, router } from "expo-router";
import { resetPassword } from "@/src/services/auth/authServices";
import PasswordField from '@/src/components/Forms/PasswordField';

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = newPassword!== '' && confirmPassword!== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [newPassword, confirmPassword]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setShowModal(true);
      return;
    }
  
    const result = await resetPassword(newPassword);
  
    if (result.success) {
      console.log('Contraseña cambiada con éxito.');
      setModalMessage("Tu contraseña ha sido cambiada con éxito.");
      setShowModal(true);
      router.push("/login");
    } else {
      console.log('Error:', result.message);
      setModalMessage(result.message);
      setShowModal(true);
    }
  };
  

  return (
    <View className={styles.container}>

      <Text className={styles.title1}>Cambiar Contraseña</Text>

      <View className={styles.containerBelow}>

        <Text className={styles.title2}>La nueva contraseña debe ser diferente a la utilizada anteriormente.</Text>

        <PasswordField
        placeholder="Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        />
        <PasswordField
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className={styles.button}
          onPress={handleChangePassword}
          disabled={isButtonDisabled}
          style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
        >
          <Text className={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
        
        <View className={styles.container7}>
          <Link href="/login" className={styles.textButton2}>
            Iniciar Sesión
          </Link>
        </View>

      </View>

      <AlertModal
          visible={showModal}
          onClose={handleModalClose}
          title="ATENCIÓN"
          message={modalMessage}
      />

    </View>
  );
};

export default ChangePasswordPage;