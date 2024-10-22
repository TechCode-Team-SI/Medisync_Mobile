import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";

const PublicationPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [post, setPost] = useState<any>(null);
  const { item } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (item) {
      setPost(JSON.parse(item));
    }
  }, [item]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-white">
      <TopBar title="Publicación" onLeftPress={toggleMenu} />

      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      {post && (
        <View className="flex-1">
          <Image
            source={getImageSource(post.image)}
            className="absolute top-0 left-0 right-0 w-full h-[300px]"
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-5 left-5 z-10 "
          >
            <Entypo name="arrow-with-circle-left" size={30} color="#FFFF" />
          </TouchableOpacity>

          <View className="flex-1 mt-[230px] bg-white p-[30px] z-1 rounded-t-[35px]">
            <Text className="text-2xl font-bold text-[#539091]">
              {post.title}
            </Text>

            <View className="mt-5">
              <Text className="text-base text-[#539091] text-justify">
                {post.content}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const getImageSource = (imageName: string) => {
  switch (imageName) {
    case "arterial.jpeg":
      return require("../../../assets/posts/arterial.jpeg");
    case "Artritis.jpeg":
      return require("../../../assets/posts/Artritis.jpeg");
    case "cardiaca.jpeg":
      return require("../../../assets/posts/cardiaca.jpeg");
    case "diabetes.jpeg":
      return require("../../../assets/posts/diabetes.jpeg");
    case "epoc.jpg":
      return require("../../../assets/posts/epoc.jpg");
    default:
      return null;
  }
};

export default PublicationPage;
