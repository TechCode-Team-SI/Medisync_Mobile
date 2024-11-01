import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface CarouselHomeProps {
  onUpdateHasPublications: (has: boolean) => void;
}

const CarouselHome: React.FC<CarouselHomeProps> = ({
  onUpdateHasPublications,
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
          onUpdateHasPublications(json.data.length > 0); // Actualizar el estado de publicaciones
        } else {
          onUpdateHasPublications(false); // No hay publicaciones
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        onUpdateHasPublications(false); // Error al obtener publicaciones
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Cargando...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">No hay publicaciones</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className="text-lg font-bold my-5 ml-5 text-[#539091]">
        Mantente informado
      </Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
      >
        {data.map((item, index) => {
          const imageSource = getImageSource(item.image);
          return (
            <View
              key={index}
              className="w-[300px] h-[300px] mx-0 justify-center border border-white"
            >
              {imageSource ? (
                <Image
                  source={imageSource}
                  className="w-full h-full rounded-none"
                />
              ) : (
                <View className="w-full h-full bg-gray-300 justify-center items-center">
                  <Text className="text-white">Imagen no disponible</Text>
                </View>
              )}
              <View
                style={{ backgroundColor: "rgba(83, 144, 145, 0.8)" }}
                className="absolute p-[20px] w-full border-white border-y-2 flex flex-col gap-y-[20px]"
              >
                <Text className="text-white font-bold text-lg">
                  {item.title}
                </Text>
                <Text numberOfLines={4} className="text-white">
                  {item.description}
                </Text>
                <TouchableOpacity onPress={() => handleReadMore(item)}>
                  <Text className="text-white font-bold text-right">
                    Leer más
                  </Text>
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
