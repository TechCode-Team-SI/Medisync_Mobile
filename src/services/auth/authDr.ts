import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Dr{
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  dni: string;
}

type ApiResult =
  | { success: true; data: Dr[] }
  | { success: false; message: string };

  export const getDr = async (specialtyid:string[]): Promise<ApiResult> => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      const userSession = session ? JSON.parse(session) : null;
      const token = userSession?.token; 
  
      if (!token) {
        return { success: false, message: 'Token no disponible.' };
      }
  
      const specialtyParams = specialtyid.map(id =>`filters[specialtyIds][]=${encodeURIComponent(id)}`).join('&');
      const url = `https://chengkev.online/api/v1/users?${specialtyParams}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('data:', response.data );
      const specialtiesArray = response.data.data || [];
    return { success: true, data: specialtiesArray as Dr[] };
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
  