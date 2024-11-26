import axios from 'axios';
import { getToken } from '../auth/sessionServices'; 
import { api } from '../api/apiConfig';



export const getNotifications = async () => {
  const token = await getToken(); 
  
  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return { success: false, message: "No se encontró el token de autenticación." };
  }

  try {
    const response = await axios.get(api.notifications, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data }; 
  } catch (error: any) {
    console.log("Error al obtener las notificaciones:", error);
    return { success: false, message: "Error al obtener las notificaciones." };
}};
