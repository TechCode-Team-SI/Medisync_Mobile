import axios from 'axios';
import { api } from "@/src/services/api/apiConfig";
import { ApiResult, handleError } from "@/src/services/error/errorHandler"

type MedicalCenter = {
  id: number;
  name: string;
  address: string;
  state: string;
  municipality: string;
  parish: string;
  localPhone: string;
  mobilePhone: string;
  mission: string;
  vision: string;
  instagramName: string;
  twitterName: string;
  facebookName: string;
  tiktokName: string;
  email: string;
};

export const getMedicalCenters = async (): Promise<ApiResult> => {
  try {

    const response = await axios.get(api.infoCompany);

    console.log('Info centro médico:', response.data);
    
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

