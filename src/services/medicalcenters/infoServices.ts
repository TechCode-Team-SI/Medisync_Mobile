import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApiResult = 
  | { success: true; data: any }  
  | { success: false; message: string };  

type MedicalCenter = {
  id: number;
  name: string;
  address: string;
  state: string;
  municipality: string;
  parish: string;
  localPhone: string;
  mobilePhone: string;
  mission: string;
  vision: string;
};

export const getMedicalCenters = async (): Promise<ApiResult> => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    const userSession = session ? JSON.parse(session) : null;
    const token = userSession?.token; // Acceder al token

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }

    const response = await axios.get(api.infoCompany, {
      headers: { 
        accept: 'application/json',
        Authorization: `Bearer ${token}` 
      }
    });

    console.log('Info centro médico:', response.data);
    
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
