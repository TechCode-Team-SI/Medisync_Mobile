import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResult } from '../api/apiConfig';
import { handleError } from "@/src/services/error/errorHandler"

export interface Dr{
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  dni: string;
}

  export const getDr = async (specialtyid:string[]): Promise<ApiResult<any>> => {
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