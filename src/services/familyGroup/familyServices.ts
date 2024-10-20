import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { ApiResult, handleError } from "@/src/services/error/errorHandler"


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