import { api } from "../api/apiConfig";
import axios from "axios";

export interface ArticleCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  path: string;
  categories: ArticleCategory[]; 
}

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(api.articles);
    const json = await response.json();

    //console.log("Fetched articles:", json.data);

    if (Array.isArray(json.data)) {
      return json.data.map((article: any) => {
        const imageUrl = article.image?.path || null;
        const categories = article.categories || [];

        return {
          ...article,
          image: imageUrl,
          categories: categories.map((category: any) => ({
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          })),
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};


export const getArticleCategories = async () => {
  try {
    const response = await axios.get(api.articlesCategories); 

    return { success: true, data: response.data }; 
  } catch (error: any) {
    console.log("Error al obtener las categorías de artículos:", error);
    return { success: false, message: "Error al obtener las categorías de artículos." }; 
  }
};



