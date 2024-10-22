import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { getToken } from "@/src/services/auth/sessionServices";
import { ApiResult, handleError } from "@/src/services/error/errorHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResult> => {
  try {
    const token = await getToken();
    const response = await axios.patch(
      api.infoUser, 
      {
        currentPassword,
        password: newPassword 
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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


export const verifyCurrentPassword = async (currentPassword: string): Promise<boolean> => {
  try {
    const storedPassword = await AsyncStorage.getItem('userPassword');

    if (storedPassword === currentPassword) {
      console.log('La contraseña actual es correcta.');
      return true; 
    } else {
      console.log('La contraseña actual no coincide.');
      return false; 
    }
  } catch (error) {
    console.error('Error en verifyCurrentPassword:', error);
    return false; 
  }
};
