import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { getToken } from "@/src/services/auth/sessionServices";
import { ApiResult, handleError } from "@/src/services/error/errorHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResult> => {
  try {
    const token = await getToken();
    const response = await axios.patch(
      api.infoUser, // Endpoint para cambiar la contraseña
      {
        currentPassword,
        password: newPassword 
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Mostrar la respuesta de la API en la consola
    console.log('Respuesta de la API (changePassword):', response.data);

    if (response.status !== 200) {
      throw new Error('Error al cambiar la contraseña');
    }
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error en changePassword:', error);
    return handleError(error);
  }
};

// Función para verificar si la contraseña actual es correcta
export const verifyCurrentPassword = async (currentPassword: string): Promise<boolean> => {
  try {
    // Obtener la contraseña almacenada en AsyncStorage
    const storedPassword = await AsyncStorage.getItem('userPassword');

    if (storedPassword === currentPassword) {
      console.log('La contraseña actual es correcta.');
      return true; // La contraseña es correcta
    } else {
      console.log('La contraseña actual no coincide.');
      return false; // La contraseña no coincide
    }
  } catch (error) {
    console.error('Error en verifyCurrentPassword:', error);
    return false; // Retornar falso si ocurre un error
  }
};
