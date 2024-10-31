import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler"
import { getToken } from '@/src/services/auth/sessionServices';


export const createUserPatient = async (token: string, patientData: any) => {
    try {
      const response = await axios.post(api.userPatient, patientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return handleError(error);
    }
  };


  export const getUserPatients = async () => {
    const token = await getToken();
    
    if (!token) {
      console.log("No se encontró el token de autenticación.");
      return { success: false, message: "No se encontró el token de autenticación." };
    }
  
    try {
      const response = await axios.get(api.userPatient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log("Error al obtener los pacientes:", error); 
      return { success: false, message: "Error al obtener los pacientes." };
    }
  };
  





