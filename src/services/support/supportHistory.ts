import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResult, handleError } from "@/src/services/error/errorHandler"
import { getToken } from '../auth/sessionServices';


export const tickets = async (): Promise<ApiResult> => {
    try {

      const token = await getToken(); 

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }

      const response = await axios.get(api.tickets, 

        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

      );
      
      console.log( 'Registro exitoso:', response.data);

      return { success: true, data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };