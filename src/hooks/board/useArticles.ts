import { useState, useEffect } from "react";
import { fetchArticles, Article } from "@/src/services/board/boardServices";
import { filterArticlesBySearchText } from "@/src/utils/board/articleUtils";

export const useArticles = (searchText: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const data = await fetchArticles();
      setArticles(data);
      setLoading(false);
    };
    loadArticles();
  }, []);

  const filteredArticles = filterArticlesBySearchText(articles, searchText);

  return { articles, loading, filteredArticles };
};
