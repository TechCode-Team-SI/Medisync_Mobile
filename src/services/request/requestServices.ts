//////////////////////////ARREGLAR LUEGO 
import axios from "axios";
import { api } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from "../auth/sessionServices";

export interface Rating {
  review?: string;
  id: string;
  stars: number;
}

export interface Appointment {
  id: string;
  name: string;
  dni: string;
  specialization: string;
  status: string;
  date: string;
  time: string;
  doctor: string;
  gender: string;
  age: string;
  rating?: Rating; 
}


export const getRequestsMadeByMe = async () => {
  const token = await getToken();
  
  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return { success: false, message: "No se encontró el token de autenticación." };
  }

  try {
    const response = await axios.get(api.getRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return { success: true, data: response.data.data };
  } catch (error: any) {
    console.log("Error al obtener las solicitudes:", error); 
    return { success: false, message: "Error al obtener las solicitudes." };
  }
};