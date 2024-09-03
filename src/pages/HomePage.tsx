import styles from "@/src/components/HomeComponents/stylesHome";
import React from "react";
import { Text, View } from "react-native";
import ButtonsHome from "../components/HomeComponents/ButtonsHome";
import InfoHome from "../components/HomeComponents/InfoHome";
import TopBar from "../components/TopBar";

const HomePage: React.FC = () => {
  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={() => console.log("Left pressed")} />

      <View className={styles.container2}>
        <Text className={styles.title}>Hola</Text>
        <Text className={styles.title2}>Usuario</Text>
      </View>

      <View className={styles.container3}>
        <ButtonsHome />
        <InfoHome />
      </View>
    </View>
  );
};

export default HomePage;
