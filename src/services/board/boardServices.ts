import { api } from "../api/apiConfig";

export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  path: string;
  date?: string;
}

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(api.articles);
    const json = await response.json();

    console.log("Fetched articles:", json.data);

    if (Array.isArray(json.data)) {
      return json.data.map((article: any) => {
        const imageUrl = article.image?.path || null;

        console.log("Generated image URL:", imageUrl);

        return {
          ...article,
          image: imageUrl,
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