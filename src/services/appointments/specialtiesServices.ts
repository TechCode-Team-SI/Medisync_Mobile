import axios from 'axios';
import { api, ApiResult } from "@/src/services/api/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleError } from "@/src/services/error/errorHandler"


export interface Specialties{
  id: string;
  name: string;
  description: string;
  patch: string;
}

  export const getspecialites = async (): Promise<ApiResult<any>> => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      const userSession = session ? JSON.parse(session) : null;
      const token = userSession?.token; 
  
      if (!token) {
        return { success: false, message: 'Token no disponible.' };
      }
  
      const response = await axios.get(api.specialites, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        } );
      
      console.log('Search exitoso:');
      console.log('data:', response.data );
      const specialtiesArray = response.data.data || [];
    return { success: true, data: specialtiesArray as Specialties[] };
    } catch (error) {
      return handleError(error);
    }
  };
  