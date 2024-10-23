import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { register } from '@/src/services/support/supportSuggestion'; 
import { validateDescription, validateTitle } from '@/src/utils/validators'; 


interface HandleRegisterParams {
    inputTitle: string;
    inputDescription: string;
    setModalMessage: (message: string) => void;
    setModalVisible: (visible: boolean) => void;
  }
  
  export const handleRegister = async ({
    inputTitle,
    inputDescription,
    setModalMessage,
    setModalVisible,
  }: HandleRegisterParams) => {
  
    if (!validateTitle(inputTitle)) {
      setModalMessage('El Titulo  esta vacio.');
      setModalVisible(true);
      return;
    }
    if (!validateDescription(inputDescription)) {
      setModalMessage(' La Descripcion esta vacia.');
      setModalVisible(true);
      return;
    }
   
    try {
      const registerData =
      {
        title: inputTitle,
        description: inputDescription,
        // status: "string",
        type: "suggestion"
      };
      
      const response = await register(registerData);
      console.log('Registro exitoso:', response);
      setModalMessage('Registro exitoso');
      setModalVisible(true);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.message || 'Error de validación. Intenta de nuevo.';
        console.log('Error de validación:', message);
        setModalMessage(message); 
      } else {
        console.log('Error al registrar usuario:', error);
        setModalMessage('Error al registrar.');
      }
      setModalVisible(true);
    }
  };