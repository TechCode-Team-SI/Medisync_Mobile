import React, { useState } from "react";
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import TopBar from "../components/Navigation/TopBar";
import SideMenuModal from "../components/Navigation/SideMenuModal";
import { useFocusEffect } from '@react-navigation/native';
import { getNotifications, markAllAsRead } from "../services/user/notificationsServices";
import Loader from "../components/ui/Loader";

const NotificationsPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);  

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotifications = async () => {
        setIsLoading(true);  
        const result = await getNotifications();
        console.log(result.data.data)
        if (result.success) {
          setNotifications(result.data.data); 
        }
        setIsLoading(false);  
      };
      fetchNotifications(); 
    }, [])
  );

  const markAllAsReadHandler = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          read: true 
        }))
      );
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <View className={`p-4 mb-2 rounded-lg shadow-md ${item.read ? 'bg-white' : 'bg-bgInput'}`}>
      <Text className="text-lg text-primary font-montserrat">{item.title}</Text>
      <Text className="text-sm text-gray-500 py-2">{item.content}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <TopBar title="Notificaciones" onLeftPress={toggleMenu} />
      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

      <View className="flex-1 p-4">

        <View className="mt-2 mb-4 items-end">
          <TouchableOpacity 
              onPress={markAllAsReadHandler} 
              className="bg-secondary p-2.5 rounded-3xl shadow-md h-9"
            >
              <Text className="text-white text-center text-xs font-bold">Marcar como leídas</Text>
            </TouchableOpacity>
        </View>

        {isLoading ? (
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
