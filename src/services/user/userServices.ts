import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApiResult = 
  | { success: true; data: any }  
  | { success: false; message: string };  

export const getUser = async (): Promise<ApiResult> => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      const userSession = session ? JSON.parse(session) : null;
      const token = userSession?.token; 
  
      if (!token) {
        return { success: false, message: 'Token no disponible.' };
      }
  
      const response = await axios.get(api.infoUser, {
        headers: { 
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Usuario:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      return handleError(error);
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