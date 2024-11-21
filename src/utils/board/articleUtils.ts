import { Article } from "@/src/services/board/boardServices";

export const getImageSource = (imageUrl: string) => {
  return imageUrl ? { uri: imageUrl } : undefined; 
};

export const filterArticlesBySearchText = (articles: Article[], searchText: string) => {
  return articles.filter((article) =>
    article.title?.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const formatArticleDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
