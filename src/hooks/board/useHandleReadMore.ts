import { useRouter } from "expo-router";
import { Article } from "@/src/services/board/boardServices";

export const useHandleReadMore = () => {
  const router = useRouter();
  
  return (article: Article) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(article) },
    });
  };
};
