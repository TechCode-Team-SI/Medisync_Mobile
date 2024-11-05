import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { handleLogout } from "@/src/services/auth/authUtils";
import ConfirmLogoutModal from "../Modal/ConfirmLogoutModal";

const SideMenu: React.FC = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => setLogoutModalVisible(true);
  const hideLogoutModal = () => setLogoutModalVisible(false);

  const handleLogoutConfirm = () => {
    hideLogoutModal();
    handleLogout();
  };

  return (
    <View className="absolute top-0 left-0 h-full bg-bgMenu w-full font-roboto">
      <View className="bg-primary w-full h-1/4"></View>

      <TouchableOpacity
        className="p-5 flex-row"
        onPress={() => router.push("/homeuser")}
      >
        <Foundation name="home" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/search")}
      >
        <Ionicons name="add-circle" size={22} color="#539091" />
        <Text className="text-sm text-primary mx-3">Agenda una cita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/appointment")}
      >
        <Ionicons name="calendar" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Tus citas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/notifications")}
      >
        <Ionicons name="notifications" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/profile")}
      >
        <Ionicons name="person" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/board")}
      >
        <MaterialCommunityIcons
          name="view-dashboard"
          size={20}
          color="#539091"
        />
        <Text className="text-sm text-primary mx-3">Cartelera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 flex-row"
        onPress={() => router.push("/support")}
      >
        <MaterialCommunityIcons name="headset" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Soporte</Text>
      </TouchableOpacity>

      <View className="my-2">
        <View className="h-[1px] bg-primary mx-4"></View>
      </View>

      <TouchableOpacity className="p-4 flex-row" onPress={showLogoutModal}>
        <MaterialCommunityIcons name="logout" size={20} color="#539091" />
        <Text className="text-sm text-primary mx-3">Cerrar sesión</Text>
      </TouchableOpacity>

      <ConfirmLogoutModal
        isVisible={logoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={hideLogoutModal}
      />
    </View>
  );
};

export default SideMenu;
