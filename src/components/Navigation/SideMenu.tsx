import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { handleLogout } from '@/src/services/auth/authUtils';
import AskModal from '@/src/components/Modal/AskModal';
import styles from '../HomeComponents/stylesHome';


const SideMenu: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); 

  const handleHome = () => {
    router.push("/homeuser");
  };
  const handleAppointments = () => {
    router.push("/appointment");
  };
  const handleSearch = () => {
    router.push("/search");
  };
  const handleNotifications = () => {
    router.push("/notifications");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleBoard = () => {
    router.push("/board");
  };
  const handleSupport = () => {
    router.push("/support");
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setModalVisible(false); 
  };

  return (
    <View className="absolute top-0 left-0 h-full bg-bgMenu w-full font-roboto">
      <View className='bg-primary w-full h-1/4 tems-center justify-center'>
      <Image
          source={require('@/assets/images/vitalcarewhite.png')}
          className="ml-8 w-36 h-36"
          resizeMode="contain"
        /></View>

      <TouchableOpacity className="p-5 flex-row" onPress={handleHome}>
        <Foundation name="home" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleSearch}>
        <Ionicons name="add-circle" size={22} color="#539091" />
        <Text className="text-sm text-primary mx-3">Agenda una cita</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleAppointments}>
        <Ionicons name="calendar" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Tus citas</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleNotifications}>
        <Ionicons name="notifications" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleProfile}>
        <Ionicons name="person" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleBoard}>
        <MaterialCommunityIcons name="view-dashboard" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Cartelera</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleSupport}>
        <MaterialCommunityIcons name="headset" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Soporte</Text>
      </TouchableOpacity>

      <View className="my-2">
        <View className="h-[1px] bg-primary mx-4"></View>
      </View>

      <TouchableOpacity className="p-4 flex-row" onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="logout" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Cerrar sesión</Text>
      </TouchableOpacity>

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

export default SideMenu;

