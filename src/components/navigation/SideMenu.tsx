import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, router } from "expo-router";

const SideMenu: React.FC = () => {

  const handleHome = () => {
    router.push("/home");
  };
  const handleAppointments = () => {
  };
  const handleSearch = () => {
  };
  const handleNotifications = () => {
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleBoard = () => {
  };
  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <View className="absolute top-0 left-0 h-full bg-bgMenu w-full font-roboto  ">
       
        <View className='bg-primary w-full h-1/4'>

        </View>

      <TouchableOpacity className="p-5 flex-row " onPress={handleHome}>
        <Foundation name="home" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row ">
        <Ionicons name="calendar" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Citas</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row ">
        <Ionicons name="search-sharp" size={22} color="#539091" />
        <Text className="text-sm text-primary mx-3">Buscar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="p-4 flex-row ">
        <Ionicons name="notifications" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row" onPress={handleProfile}>
        <Ionicons name="person" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row">
        <MaterialCommunityIcons name="view-dashboard" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Cartelera</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-4 flex-row ">
        <MaterialCommunityIcons name="headset" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Asistencia</Text>
      </TouchableOpacity>

      <View className="my-2">
        <View className="h-[1px] bg-primary mx-4"></View>
      </View>

      <TouchableOpacity className="p-4 flex-row" onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Cerrar sesión</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SideMenu;

