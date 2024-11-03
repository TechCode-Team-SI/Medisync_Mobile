import { api, ApiResult} from "../api/apiConfig";

export interface Article {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    image?: string;
    date?: string; // Si estás añadiendo la propiedad de fecha formateada
  }

export const fetchArticles = async () => {
    try {
      const response = await fetch(api.articles);
      const json = await response.json();
  
      if (Array.isArray(json.data)) {
        return json.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };