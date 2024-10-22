import axios from 'axios';
import { ApiResult } from '../api/apiConfig';
  
export const handleError = (error: any): ApiResult<any> => {
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
  