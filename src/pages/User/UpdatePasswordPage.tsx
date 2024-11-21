import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import ButtonBack from '@/src/components/Navigation/ButtonBack';
import { validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 
import { changePassword, verifyCurrentPassword } from '@/src/services/password/updatePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordField from '@/src/components/Forms/PasswordField';
import AlertModal from '@/src/components/Modal/AlertModal';
import CustomButton from '@/src/components/ui/CustomButton';

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

  const validateInputs = async (): Promise<boolean> => {
    if (!inputPassword || !inputNewPassword || !inputRepeatPassword) {
      showModal('Por favor, completa todos los campos.');
      return false;
    }

    if (!validatePasswordLength(inputNewPassword)) {
      showModal('La nueva contraseña debe tener al menos 8 caracteres.');
      return false;
    }

    if (!validatePasswordsMatch(inputNewPassword, inputRepeatPassword)) {
      showModal('La nueva contraseña y la confirmación no coinciden.');
      return false;
    }

    const isCurrentPasswordValid = await verifyCurrentPassword(inputPassword);
    if (!isCurrentPasswordValid) {
      showModal('La contraseña actual no es correcta.');
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    const isValid = await validateInputs();
    if (!isValid) return;

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
      console.error('Error en handleChangePassword:', error);
      showModal('Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View className={styles.container}>
      <ButtonBack />
      <Text className={styles.title4}>Actualizar Contraseña</Text>

      <View className={styles.containerBg1}>
        <Text className={styles.title2}>Ingresa la información requerida</Text>

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

        <CustomButton
          onPress={handleChangePassword}
          title="Guardar"
        />
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

