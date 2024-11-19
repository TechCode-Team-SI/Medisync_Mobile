import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "@/src/components/HomeComponents/stylesHome";
import { fetchArticles, Article } from "@/src/services/board/boardServices";
import Loader from "../ui/Loader";
import { useHandleReadMore } from "@/src/hooks/board/useHandleReadMore";
import { getImageSource, filterArticlesBySearchText } from "@/src/utils/board/articleUtils";

interface CarouselHomeProps {
  onUpdateHasPublications: (has: boolean) => void;
  searchText: string;
}

const CarouselHome: React.FC<CarouselHomeProps> = ({ onUpdateHasPublications, searchText }) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const handleReadMore = useHandleReadMore();

  useEffect(() => {
    const loadData = async () => {
      const articles = await fetchArticles();
      setData(articles);
      onUpdateHasPublications(articles.length > 0);
      setLoading(false);
    };

    loadData();
  }, [onUpdateHasPublications]);

  const filteredData = useMemo(() => filterArticlesBySearchText(data, searchText), [data, searchText]);

  const renderArticle = ({ item }: { item: Article }) => {
    const imageSource = getImageSource(item.image);
    const formattedDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <TouchableOpacity onPress={() => handleReadMore(item)} className={styles.carouselItem}>
        {imageSource ? (
          <Image source={imageSource} className={styles.carouselImage} />
        ) : (
          <View className={styles.imagePlaceholder}>
            <Text className={styles.placeholderText}>Imagen no disponible</Text>
          </View>
        )}
        <View className={styles.carouselContent}>
          <Text className={styles.carouselItemTitle}>{item.title}</Text>
          <Text className={styles.carouselDate}>{formattedDate}</Text>
          {item.categories && item.categories.length > 0 && (
            <Text className={styles.carouselDate}>
              {item.categories.map((cat) => cat.name).join(", ")}.
            </Text>
          )}
          <Text numberOfLines={4} className={styles.carouselItemDescription}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className={styles.carouselTitle}>Mantente informado</Text>
      <FlatList
        data={filteredData.length > 0 ? filteredData : data}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
        }}
      />
    </View>
  );
};

export default CarouselHome;


