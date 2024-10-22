import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResult, handleError } from "@/src/services/error/errorHandler"
import { getToken, clearSession } from "@/src/services/auth/sessionServices"

export const getUser = async (): Promise<ApiResult> => {
  try {
    const token = await getToken(); 

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }

    const response = await axios.get(api.infoUser, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};