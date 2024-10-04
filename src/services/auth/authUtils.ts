import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authServices'; 
import { router } from 'expo-router';

import { uploadImage } from '@/src/services/files/filesServices';
import { register } from '@/src/services/auth/authServices'; 
import { validateEmail, validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 

interface HandleRegisterParams {
  inputEmail: string;
  inputPassword: string;
  inputPassword2: string;
  inputName: string;
  selectedImage: string | null; 
  setModalMessage: (message: string) => void;
  setModalVisible: (visible: boolean) => void;
}

export const handleRegister = async ({
  inputEmail,
  inputPassword,
  inputPassword2,
  inputName,
  selectedImage,
  setModalMessage,
  setModalVisible,
}: HandleRegisterParams) => {
  if (!validateEmail(inputEmail)) {
    setModalMessage('El email no es válido.');
    setModalVisible(true);
    return;
  }
  if (!validatePasswordLength(inputPassword)) {
    setModalMessage('La contraseña debe tener al menos 8 caracteres.');
    setModalVisible(true);
    return;
  }
  if (!validatePasswordsMatch(inputPassword, inputPassword2)) {
    setModalMessage('Las contraseñas no coinciden.');
    setModalVisible(true);
    return;
  }

  try {
    let imageId = null;

    if (selectedImage) {
      const file = await uploadImage(selectedImage);
      imageId = file.id; 
    }

    const registerData = {
      email: inputEmail,
      password: inputPassword,
      fullName: inputName,
      ...(imageId && { file: imageId }), 
    };

    const response = await register(registerData);

    console.log('Registro exitoso:', response);
    setModalMessage('Registro exitoso');
    setModalVisible(true);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    setModalMessage('Error al registrar usuario. Intenta de nuevo.');
    setModalVisible(true);
  }
};


export const handleLogout = async () => {
  try {
    const userSession = await AsyncStorage.getItem('userSession');

    if (userSession) {
      const { token } = JSON.parse(userSession);

      const result = await logout(token); 

      if (result.success) {
        await AsyncStorage.removeItem('userSession');
        router.push("/login");
      } else {
        console.log('Error al cerrar sesión:', result.message);
      }
    } else {
      console.log('No hay sesión activa.');
    }
  } catch (error) {
    console.error('Error en el handleLogout:', error);
  }
};

