import { logout,login } from './authServices'; 
import { confirmEmail } from './confirmEmailServices';
import { router } from 'expo-router';
import { register } from '@/src/services/auth/authServices'; 
import { validateEmail, validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HandleRegisterParams {
  email: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  dni: string;
  selectedGender: string;
  birthday: Date | null;
  setModalMessage: (message: string) => void;
  setModalVisible: (visible: boolean) => void;
  setShowSuccessModal: (visible: boolean) => void;
}

export const handleRegister = async ({
  email,
  password,
  password2,
  name,
  phone,
  dni,
  selectedGender,
  birthday,
  setShowSuccessModal,
  setModalMessage,
  setModalVisible,
}: HandleRegisterParams) => {
  if (!validateEmail(email)) {
    setModalMessage('El email no es válido.');
    setModalVisible(true);
    return;
  }
  if (!validatePasswordLength(password)) {
    setModalMessage('La contraseña debe tener al menos 8 caracteres.');
    setModalVisible(true);
    return;
  }
  if (!validatePasswordsMatch(password, password2)) {
    setModalMessage('Las contraseñas no coinciden.');
    setModalVisible(true);
    return;
  }

  try {
    const registerData = {
      email: email,
      password: password,
      fullName: name,
      phone: phone,
      userPatient: {
        dni: dni,
        fullName: name,
        gender: selectedGender,
        birthday: birthday?.toISOString(),
      },
    };

    const registerResponse = await register(registerData);
    console.log('Registro exitoso:', registerResponse);

    const token = registerResponse.token; 
    if (token) {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userPassword', password);

      const confirmResponse = await confirmEmail(email);

      if (confirmResponse.success) {
        setModalMessage(
          'Se ha enviado un código a su correo electrónico para confirmar su correo.'
        );
        setModalVisible(true);
      } else {
        setModalMessage(
          confirmResponse.message || 'Error al enviar el código de confirmación.'
        );
        setModalVisible(true);
      }
    } else {
      setModalMessage('No se pudo obtener el token después del registro.');
      setModalVisible(true);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const message =
        error.response.data.message || 'Error de validación. Intenta de nuevo.';
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
      router.replace("/login"); 
    } else {
      console.log('Error al cerrar sesión:', result.message);
    }
  } catch (error) {
    console.error('Error en el handleLogout:', error);
  }
};

