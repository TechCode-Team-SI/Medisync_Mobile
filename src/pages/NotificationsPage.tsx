import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";

import TopBar from "../components/Navigation/TopBar";
import SideMenuModal from "../components/Navigation/SideMenuModal";
import { useFocusEffect } from '@react-navigation/native';
import { getNotifications } from "../services/user/notificationsServices";
import Loader from "../components/ui/Loader";

const NotificationsPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Estado de carga

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotifications = async () => {
        setIsLoading(true);  // Activamos el estado de carga
        const result = await getNotifications();
        console.log("Resultado de la API de notificaciones:", result); 
        if (result.success) {
          console.log("Notificaciones:", result.data.data); 
          setNotifications(result.data.data); 
        } else {
          console.log("Error al obtener notificaciones:", result.message); 
        }
        setIsLoading(false);  // Desactivamos el estado de carga
      };

      fetchNotifications(); 
    }, [])
  );

  const renderNotification = ({ item }: { item: any }) => (
    <View className="p-4 mb-2 bg-white rounded-lg shadow-md">
      <Text className="text-lg text-primary font-montserrat">{item.title}</Text>
      <Text className="text-sm text-gray-400 py-2">{item.content}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <TopBar title="Notificaciones" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

      <View className="flex-1 p-4">
        {isLoading ? (  // Si está cargando, muestra el Loader
          <Loader />
        ) : notifications.length === 0 ? (
          <Text className="text-center text-gray-400 py-6 text-lg font-bold">No tienes notificaciones</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={renderNotification}
          />
        )}
      </View>
    </View>
  );
};

export default NotificationsPage;

