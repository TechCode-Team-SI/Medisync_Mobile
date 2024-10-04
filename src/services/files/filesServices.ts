import axios, { AxiosError } from 'axios';
import { api } from '@/src/services/api/apiConfig';

export const uploadImage = async (imageUri: string) => {
  const formData = new FormData();
  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append('file', blob, 'profile.jpg');

  try {
    const uploadResponse = await axios.post(api.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Respuesta de la subida de imagen:', uploadResponse.data);
    return uploadResponse.data.file.id; 
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error('Error de respuesta del servidor:', axiosError.response.data);
      console.error('Código de estado:', axiosError.response.status);
    } else if (axiosError.request) {
      console.error('Sin respuesta del servidor:', axiosError.request);
    } else {
      console.error('Error al configurar la solicitud:', axiosError.message);
    }
    throw error; 
  }
};
