import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResult, handleError } from "@/src/services/error/errorHandler"
import { getToken, clearSession, saveSession} from "@/src/services/auth/sessionServices"



export const tickets = async (title: string, description: string, type: string = "suggestion"): Promise<ApiResult> => {
    try {

      const token = await getToken(); 

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }


      const response = await axios.post(api.tickets, { title, description, type },

        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

      );
      
      console.log( 'Registro exitoso:', response.data);
  
      const {  refreshToken, tokenExpires, user } = response.data;
  
      await saveSession({
        token,
        refreshToken,
        tokenExpires,
        user
      });
  
      return { success: true, data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

  export const logout = async (): Promise<ApiResult> => {
    try {
      const token = await getToken(); 
  
      if (!token) {
        return { success: false, message: 'Token no disponible.' };
      }
  
      const response = await axios.post(api.tickets, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      await clearSession(); 
      console.log('Cierre de sesión exitoso:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

 export const register = async (registerData: any): Promise<ApiResult> => {
  try {
    const token = await getToken(); 

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }

    const response = await axios.get(api.tickets,registerData );

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};