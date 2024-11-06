import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/src/components/HomeComponents/stylesHome";
import { fetchArticles, Article } from "@/src/services/board/boardServices";
import Loader from "../ui/Loader";

interface CarouselHomeProps {
  onUpdateHasPublications: (has: boolean) => void;
  searchText: string;
}

const CarouselHome: React.FC<CarouselHomeProps> = ({
  onUpdateHasPublications,
  searchText,
}) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const articles = await fetchArticles();
      setData(articles);
      onUpdateHasPublications(articles.length > 0);
      setLoading(false);
    };

    loadData();
  }, [onUpdateHasPublications]);

  const handleReadMore = (item: Article) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(item) },
    });
  };

  const getImageSource = (imageUrl: string) => {
    return imageUrl ? { uri: imageUrl } : null; 
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View className={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }

  if (filteredData.length === 0 && searchText) {
    return (
      <View className={styles.loadingContainer}>
        <Text className={styles.loadingText}>No hay publicaciones.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className={styles.carouselTitle}>Mantente informado</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
        }}
      >
        {(filteredData.length > 0 ? filteredData : data).map((item, index) => {
          const imageSource = getImageSource(item.image);
          const formattedDate = new Date(item.createdAt).toLocaleDateString();
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleReadMore(item)}
              className={styles.carouselItem}
            >
              {imageSource ? (
                <Image source={imageSource} className={styles.carouselImage} />
              ) : (
                <View className={styles.imagePlaceholder}>
                  <Text className={styles.placeholderText}>
                    Imagen no disponible
                  </Text>
                </View>
              )}
              <View className={styles.carouselContent}>
                <Text className={styles.carouselItemTitle}>{item.title}</Text>
                <Text className={styles.carouselDate}>{formattedDate}</Text>
                <Text
                  numberOfLines={4}
                  className={styles.carouselItemDescription}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CarouselHome;
