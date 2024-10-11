import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authServices'; 
import { router } from 'expo-router';
import { register } from '@/src/services/auth/authServices'; 
import { validateEmail, validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 

interface HandleRegisterParams {
  inputEmail: string;
  inputPassword: string;
  inputPassword2: string;
  inputName: string;
  inputPhone: string;
  setModalMessage: (message: string) => void;
  setModalVisible: (visible: boolean) => void;
}

export const handleRegister = async ({
  inputEmail,
  inputPassword,
  inputPassword2,
  inputName,
  inputPhone,
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
    const registerData = {
      email: inputEmail,
      password: inputPassword,
      fullName: inputName,
      phone: inputPhone,
    };

    const response = await register(registerData);
    console.log('Registro exitoso:', response);
    setModalMessage('Registro exitoso');
    setModalVisible(true);
    router.push("/login");
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const message = error.response.data.message || 'Error de validación. Intenta de nuevo.';
      console.log('Error de validación:', message);
      setModalMessage(message); 
    } else {
      console.log('Error al registrar usuario:', error);
      setModalMessage('Error al registrar usuario. Intenta de nuevo.');
    }
    setModalVisible(true);
  }
};

export const handleLogout = async () => {
  try {
    const result = await logout(); 

    if (result.success) {
      router.push("/login"); 
    } else {
      console.log('Error al cerrar sesión:', result.message);
    }
  } catch (error) {
    console.error('Error en el handleLogout:', error);
  }
};
