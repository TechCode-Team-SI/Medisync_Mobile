import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from '@/src/services/auth/sessionServices';

export interface CreateRating {
    review: string,
    stars: number;  
}

export const rateRequest = async (id: string, rating: CreateRating) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }

      const response = await axios.post(`${api.rateRequest.replace(":id", id.toString())}`, rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return handleError(error);
    }
};
