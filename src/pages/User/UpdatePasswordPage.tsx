import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import { validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 
import { changePassword, verifyCurrentPassword } from '@/src/services/password/updatePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordField from '@/src/components/Forms/PasswordField';
import AlertModal from '@/src/components/Modal/AlertModal';

const UpdatePasswordPage: React.FC = () => {
  const [inputPassword, setInputPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputRepeatPassword, setInputRepeatPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleBack = async (): Promise<void> => {
    if (!inputPassword || !inputNewPassword || !inputRepeatPassword) {
      showModal('Por favor, completa todos los campos.');
      return;
    }

    if (!validatePasswordLength(inputNewPassword)) {
      showModal('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!validatePasswordsMatch(inputNewPassword, inputRepeatPassword)) {
      showModal('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    const isCurrentPasswordValid = await verifyCurrentPassword(inputPassword);
    if (!isCurrentPasswordValid) {
      showModal('La contraseña actual no es correcta.');
      return;
    }

    try {
      const result = await changePassword(inputPassword, inputNewPassword);
      if (result.success) {
        await AsyncStorage.setItem('userPassword', inputNewPassword);
        showModal('La contraseña ha sido cambiada correctamente.');
        setInputPassword('');
        setInputNewPassword('');
        setInputRepeatPassword('');
      } else {
        showModal(result.message || 'Hubo un problema al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error en handleBack:', error);
      showModal('Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View className={styles.container}>
      <ButtonBack />
      <Text className={styles.title4}>Actualizar Contraseña</Text>

      <View className={styles.containerBg1}>
        <Text className={styles.title2}> Ingresa la información requerida </Text>

        <PasswordField
          placeholder="Contraseña actual"
          value={inputPassword}
          onChangeText={setInputPassword}
        />

        <PasswordField
          placeholder="Nueva contraseña"
          value={inputNewPassword}
          onChangeText={setInputNewPassword}
        />

        <PasswordField
          placeholder="Confirmar contraseña"
          value={inputRepeatPassword}
          onChangeText={setInputRepeatPassword}
        />

        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button1}
            onPress={handleBack}
          >
            <Text className={styles.buttonText1}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="ATENCIÓN"
        message={modalMessage}
      />
    </View>
  );
};

export default UpdatePasswordPage;
