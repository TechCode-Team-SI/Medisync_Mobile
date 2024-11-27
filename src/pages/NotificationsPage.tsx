import React, { useState, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TopBar from "../components/Navigation/TopBar";
import SideMenuModal from "../components/Navigation/SideMenuModal";
import { getNotifications, markAllAsRead } from "../services/user/notificationsServices";
import Loader from "../components/ui/Loader";

const NotificationsPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    read?: boolean;
  }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const fetchNotifications = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await getNotifications(page);
    if (result.success) {
      setNotifications((prev) =>
        page === 1 ? result.data.data : [...prev, ...result.data.data]
      );
      setCurrentPage(result.data.currentPage);
      setTotalPages(result.data.totalPages);
    }
    setIsLoading(false);
  };

  const markAllAsReadHandler = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }
  };

  const handleScroll = ({ nativeEvent }: any) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;

    if (isCloseToBottom && currentPage < totalPages && !isLoading) {
      fetchNotifications(currentPage + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setMenuVisible(false);
      setNotifications([]);
      setCurrentPage(1);
      fetchNotifications(1);

      return () => {
      };
    }, [])
  );

  const renderNotification = (item: any) => (
    <View
      key={item.id}
      className={`p-4 mb-2 rounded-lg shadow-md ${
        item.read ? "bg-white" : "bg-bgInput"
      }`}
    >
      <Text className="text-lg text-primary font-montserrat">{item.title}</Text>
      <Text className="text-sm text-gray-500 py-2">{item.content}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <TopBar title="Notificaciones" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View className="flex-1 p-4">
        <View className="mt-2 mb-4 items-end">
          <TouchableOpacity
            onPress={markAllAsReadHandler}
            className="bg-secondary p-2.5 rounded-3xl shadow-md h-9"
          >
            <Text className="text-white text-center text-xs font-bold">
              Marcar como leídas
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {notifications.length === 0 && !isLoading ? (
            <View className="py-8">
              <Text className="text-center text-lg text-gray-400 font-bold">
                No tienes notificaciones
              </Text>
            </View>
          ) : (
            notifications.map(renderNotification)
          )}

          {isLoading && (
            <View className="py-4">
              <Loader />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default NotificationsPage;
