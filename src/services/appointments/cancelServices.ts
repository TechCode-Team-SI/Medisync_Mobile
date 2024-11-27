import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from '@/src/services/auth/sessionServices';

export const cancelRequest = async (id: string) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró un token de autenticación");
    }

    const response = await axios.post(`${api.cancelRequest.replace(":id", id.toString())}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
};
