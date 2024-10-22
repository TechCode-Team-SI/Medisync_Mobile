import axios from 'axios';
import { api } from '@/src/services/api/apiConfig';
import { getToken } from '@/src/services/auth/sessionServices';
import { Platform } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime'; 

export const uploadImage = async (image: ImagePickerAsset): Promise<string> => {
  const token = await getToken();

  const uri = Platform.OS === 'ios' ? 'file:///' + image.uri.split('file:/').join('') : image.uri; 
  const type = mime.getType(uri) ?? 'image/jpeg'; 
  const fileName = image?.fileName ?? `image_${Date.now()}.${type.split('/')[1]}`;

  const formData = new FormData();
  formData.append('file', {
    uri,
    type,
    name: fileName
  } as any);

  try {
    const uploadResponse = await axios.post(api.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    return uploadResponse.data.file.id; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la subida de la imagen:', error);
      if (error.response) {
        console.error('Detalles de la respuesta del servidor:', error.response.data);
        console.error('Código de estado:', error.response.status);
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; 
  }
};
