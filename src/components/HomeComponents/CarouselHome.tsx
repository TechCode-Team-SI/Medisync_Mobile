import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/src/components/HomeComponents/stylesHome";

interface CarouselHomeProps {
  onUpdateHasPublications: (has: boolean) => void;
  searchText: string;
}

const CarouselHome: React.FC<CarouselHomeProps> = ({
  onUpdateHasPublications,
  searchText,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const apiUrl = "https://chengkev.online/api/v1/articles";
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (Array.isArray(json.data)) {
          setData(json.data);
          onUpdateHasPublications(json.data.length > 0);
        } else {
          onUpdateHasPublications(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        onUpdateHasPublications(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [onUpdateHasPublications]);

  const handleReadMore = (item: any) => {
    router.push({
      pathname: "/publication",
      params: { article: JSON.stringify(item) },
    });
  };

  const getImageSource = (imageUrl: string) => {
    return typeof imageUrl === "string" && imageUrl.trim() !== ""
      ? { uri: imageUrl }
      : null;
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View className={styles.loadingContainer}>
        <Text className={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (filteredData.length === 0 && searchText) {
    return (
      <View className={styles.loadingContainer}>
        <Text className={styles.loadingText}>
          No hay publicaciones al respecto
        </Text>
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
      >
        {(filteredData.length > 0 ? filteredData : data).map((item, index) => {
          const imageSource = getImageSource(item.image);
          const formattedDate = new Date(item.createdAt).toLocaleDateString();
          return (
            <View key={index} className={styles.carouselItem}>
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
                <TouchableOpacity onPress={() => handleReadMore(item)}>
                  <Text className={styles.readMoreText}>Leer más</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CarouselHome;
