import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";

// Función para obtener la imagen según el nombre del archivo
const getImageSource = (imageName: string | string[]): any => {
  // Si imageName es un array, seleccionamos el primer elemento
  if (Array.isArray(imageName)) {
    imageName = imageName[0];
  }

  // Ahora imageName es un string, y puedes pasarlo a require() sin problemas
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
      console.warn(`No image found for ${imageName}`);
      return null; // Retorna null si no se encuentra la imagen
  }
};

// Restante del código...

const PublicationPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [post, setPost] = useState<any>(null);
  const { item } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (item) {
      if (Array.isArray(item)) {
        setPost(JSON.parse(item[0]));
      } else {
        setPost(JSON.parse(item));
      }
    }
  }, [item]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar title="Publicación" onLeftPress={toggleMenu} />

      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      {post && (
        <View style={{ flex: 1 }}>
          <Image
            source={getImageSource(post.image)} // Aseguramos que post.image es un string
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: 300,
            }}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
          >
            <Entypo name="arrow-with-circle-left" size={30} color="#FFFF" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              marginTop: 230,
              backgroundColor: "white",
              padding: 30,
              zIndex: 1,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#539091" }}
            >
              {post.title}
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 16, color: "#539091", textAlign: "justify" }}
              >
                {post.content}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PublicationPage;
