import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from "expo-router";
import { TUser } from "@/src/types/user"; 

import { getUser } from "@/src/services/user/userServices2"

import { handleLogout } from '@/src/services/auth/authUtils';

const ProfilePage: React.FC = () => {
  
    const [user, setUser] = useState<{ fullName: string }>({ fullName: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const result = await getUser();
        if (result.success && result.data) {
          const userData = result.data as TUser;
          setUser(userData);
          setSelectedImage(userData.photo?.path ?? null); 
        } else {
          setError(result.message || "Error al obtener datos de usuario");
        }
      };
    
      fetchUser();
    }, []);

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

            <Text className={styles.title1}>{user.fullName}</Text>
            
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
                <Text className={styles.buttonText}>Grupo familiar</Text>
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
                onPress={handleLogout}>
                  <Entypo name='log-out' size={22} color="#539091" ></Entypo>
                <Text className={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
          
          </View>
    
        </View>
      );
};

export default ProfilePage;