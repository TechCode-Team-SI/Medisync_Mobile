import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from "expo-router";

const ProfilePage: React.FC = () => {

  const inputAge = useState('');
    const inputGender = useState('');
    const inputBlood = useState('');
    const handleBack = () => {};

    const handleEdit = () => {
      router.push("/configprofile");
    };

    const handleFamily = () => {
      router.push("/family");
    };

    const handleSecurity = () => {
      router.push("/updatepassword");
    };

    const handleHistory = () => {
      router.push("/history");
    };

    const handleLogOut = () => {
      router.push("/login");
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

            <View className={styles.containerRow}>
              <Text className={styles.title3}> Edad</Text>
              <Text className={styles.title3}> Genero</Text>
              <Text className={styles.title3}> Sangre</Text>
            </View>

          <View className={styles.container3}>

            <TouchableOpacity
              className={styles.button}
              onPress={handleEdit}>
                <Entypo name='edit' size={22} color="#539091" ></Entypo>
              <Text className={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>

          <View className={styles.container3}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleFamily}>
                  <Entypo name='users' size={22} color="#539091" ></Entypo>
                <Text className={styles.buttonText}>Agenda</Text>
              </TouchableOpacity>
          </View>

          <View className={styles.container3}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleHistory}>
                  <Entypo name='list' size={24} color="#539091" ></Entypo>
                <Text className={styles.buttonText}>Historial</Text>
              </TouchableOpacity>
          </View>

          <View className={styles.container3}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleSecurity}>
                  <Entypo name='cog' size={24} color="#539091" ></Entypo>
                <Text className={styles.buttonText}>Seguridad</Text>
              </TouchableOpacity>
          </View>

          <View className={styles.container3}>
            <TouchableOpacity
                className={styles.button}
                onPress={handleLogOut}>
                  <Entypo name='log-out' size={22} color="#539091" ></Entypo>
                <Text className={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
          
          </View>
    
        </View>
      );
};

export default ProfilePage;