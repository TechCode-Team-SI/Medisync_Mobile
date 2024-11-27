import React, { useState } from "react";
import { Text, View, BackHandler, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import styles from "@/src/components/HomeComponents/stylesHome";
import ButtonsHome from "@/src/components/HomeComponents/ButtonsHome";
import InfoHome from "@/src/components/HomeComponents/InfoHome";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";

import useFetchUser from "@/src/hooks/user/useFetchUser";
import useReloadUser from "@/src/hooks/user/useReloadUser";

import CarouselHome from "@/src/components/HomeComponents/CarouselHome";
import { getToken } from "@/src/services/auth/sessionServices";

const HomeUserPage: React.FC = () => {
  const router = useRouter();
  const { user, reloadUser } = useFetchUser();
  useReloadUser(reloadUser);

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [hasPublications, setHasPublications] = useState(true);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkToken = async () => {
        const token = await getToken();
        if (!token) {
          router.replace("/home");
        }
      };

      checkToken();

      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      setMenuVisible(false); 
      setHasPublications(true); 

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [router])
  );

  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={toggleMenu} />

      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={styles.container2}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text className={styles.title}>Hola,</Text>
              <Text className={styles.title2}>{user.fullName}</Text>
            </View>
            <Image
              source={require("@/assets/images/vitalcarewhite.png")}
              className="w-24 h-24 mr-4 mt-5"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className={styles.container3}>
          <ButtonsHome />

          <View className={styles.spacingBetweenSections} />

          {hasPublications && (
            <CarouselHome
              onUpdateHasPublications={setHasPublications}
              searchText={searchText}
            />
          )}

          <InfoHome />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeUserPage;
