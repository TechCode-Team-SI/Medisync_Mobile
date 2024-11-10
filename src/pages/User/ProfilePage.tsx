import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ButtonBack from '@/src/components/Navigation/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import useFetchUser from "@/src/hooks/user/useFetchUser";
import { handleLogout } from '@/src/services/auth/authUtils';
import useReloadUser from "@/src/hooks/user/useReloadUser";
import AskModal from '@/src/components/Modal/AskModal'; 

const ProfilePage: React.FC = () => {
  const { user, selectedImage, error, reloadUser } = useFetchUser();
  useReloadUser(reloadUser);
  
  const [modalVisible, setModalVisible] = useState(false); 

  const buttons = [
    { iconName: 'edit' as const, label: 'Editar Perfil', onPress: () => router.push("/configprofile") },
    { iconName: 'users' as const, label: 'Grupo familiar', onPress: () => router.push("/family") },
    { iconName: 'list' as const, label: 'Historial', onPress: () => router.push("/history") },
    { iconName: 'cog' as const, label: 'Seguridad', onPress: () => router.push("/updatepassword") },
    { iconName: 'log-out' as const, label: 'Cerrar Sesión', onPress: () => setModalVisible(true) } 
  ];

  const handleLogoutConfirmation = () => {
    handleLogout();
    setModalVisible(false); 
  };

  return (
    <View className={styles.container}>
      <ButtonBack />
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
        {error && <Text className={styles.text}>{error}</Text>}

        {buttons.map((button, index) => (
          <View key={index} className={styles.container3}>
            <TouchableOpacity
              className={styles.button}
              onPress={button.onPress}
            >
              <Entypo name={button.iconName} size={24} color="#539091" />
              <Text className={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <AskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Cerrar Sesión"
        message="¿Estás seguro que deseas salir?"
        onAccept={handleLogoutConfirmation}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ProfilePage;
