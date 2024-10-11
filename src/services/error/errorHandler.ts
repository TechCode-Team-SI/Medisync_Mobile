import axios from 'axios';

export type ApiResult = 
  | { success: true; data: any }  
  | { success: false; message: string };

  
export const handleError = (error: any): ApiResult => {
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
  