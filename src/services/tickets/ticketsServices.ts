import axios from "axios";
import { api, ApiResult2} from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from "../auth/sessionServices";
import { ApiResult } from "@/src/services/error/errorHandler";


export const createTicket = async (token: string, ticketData: { title: string; description: string; type: string }): Promise<ApiResult> => {
    try {
      const response = await axios.post(api.tickets, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error al crear ticket:', error); 
      return handleError(error);
    }
  };

  export const getTickets= async () => {
    const token = await getToken();
    
    if (!token) {
      console.log("No se encontró el token de autenticación.");
      return { success: false, message: "No se encontró el token de autenticación." };
    }
  
    try {
      const response = await axios.get(api.mytickets, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log("Error al obtener los tickets:", error); 
      return { success: false, message: "Error al obtener los tickets." };
    }
  };


