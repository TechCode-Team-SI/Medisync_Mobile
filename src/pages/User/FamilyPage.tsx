import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const FamilyPage: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleSelect = () => {};

  return (
    <View className={styles.container}>

          <ButtonBack/>
    
          <View className={styles.containerBg1}>

            <View className={styles.containerImage}>
            {selectedImage ? (
                <Image source={{ uri: selectedImage }} className={styles.image} />
                ) : (
                <View className={styles.iconImage}>
                    <Entypo name="camera" size={24} color="#539091" />
                </View>
                )}
            </View>

            <Text className={styles.title1}> Usuario</Text>

            <View className="">
                <Text className={styles.text}> Agenda de familiares</Text>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

            </View>

          </View>
    
        </View>
  );
};

export default FamilyPage;
