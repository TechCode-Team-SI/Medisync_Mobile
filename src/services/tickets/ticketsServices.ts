import axios from "axios";
import { api } from "@/src/services/api/apiConfig";
import { ApiResult, handleError } from "@/src/services/error/errorHandler";

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