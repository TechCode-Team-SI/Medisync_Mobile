import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApiResult = 
  | { success: true; data: any }  
  | { success: false; message: string };  

export const login = async (email: string, password: string): Promise<ApiResult> => {
  try {
    const response = await axios.post(api.login, { email, password });
    console.log('Login exitoso:', response.data);

    const { token, refreshToken, tokenExpires, user } = response.data; ///GUARDAR EL TOKEN
    await AsyncStorage.setItem('userSession', JSON.stringify({
      token,
      refreshToken,
      tokenExpires,
      user
    }));

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const forgotPassword = async (email: string): Promise<ApiResult> => {
  try {
    const response = await axios.post(api.forgot, { email });
    console.log('Respuesta de la API:', response.data);

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message || 'Ocurrió un error. Inténtalo de nuevo.' };
    }
  } catch (error: any) {
    return handleError(error);
  }
};

export const logout = async (token: string): Promise<ApiResult> => {
  try {
    const response = await axios.post(
      api.logout, 
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    
    console.log('Logout exitoso:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (registerData: any) => {
  try {
    const response = await axios.post(api.register, registerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

const handleError = (error: any): ApiResult => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log('Error en la respuesta del servidor:', error.response.data);
      return { success: false, message: error.response.data.message || 'Error desconocido.' };
    }
    console.log('Error de red:', error.message);
    return { success: false, message: 'Error de red. Inténtalo de nuevo.' };
  }
  console.log('Error inesperado:', error);
  return { success: false, message: 'Ocurrió un error inesperado.' };
};
