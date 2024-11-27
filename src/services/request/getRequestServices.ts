import axios from "axios";
import { api } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from "../auth/sessionServices";

export interface Appointment {
  id: string;
  appointmentHour: string;
  appointmentDate?: string; 
  status: string;
  createdAt: string;
  patient: {
    address: string;
    birthday: string;
    dni: string;
    fullName: string;
    gender: string;
  };
  requestedMedic: {
    fullName: string;
  };
  requestedSpecialty: {
    name: string;
  };
  createdBy?: {
    fullName: string;
    id: string;
  };
  fields: Field[]; 
  referredContent?: string | null;
  rating: {
    stars: number;
  };
}

export interface Field {
  label: string; 
  description?: string | null; 
  isRequired: boolean; 
  order: number; 
  type: "selection" | "text"; 
  value?: string; 
  selectionConfig?: object | null; 
  selections?: {
    value: string; 
    isSelected: boolean;
  }[]; 
}
  
  export const getAppointmentDetails = async (appointmentId: string) => { 
    const token = await getToken(); 
   
    if (!token) { 
      return { success: false, message: "No se encontró el token de autenticación." }; 
    } 
   
    try { 
      const response = await axios.get(`${api.getRequestbyId}/${appointmentId}`, { 
        headers: { 
          Authorization: `Bearer ${token}`, 
        }, 
      }); 
      const parsedData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  
      console.log("Data:", parsedData); 
  
      return { success: true, data: parsedData }; 
    } catch (error: any) { 
      console.error("Error al obtener detalles de la cita:", error); 
      return { success: false, message: "Error al obtener detalles de la cita." }; 
    } 
  };
    