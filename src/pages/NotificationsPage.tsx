import styles from "@/src/components/HomeComponents/stylesHome";
import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableWithoutFeedback, Animated } from "react-native";
import TopBar from "../components/Navigation/TopBar";
import SideMenuModal from "../components/Navigation/SideMenuModal";
import { useFocusEffect } from '@react-navigation/native'

const NotificationsPage: React.FC = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

  return (
    <View className={styles.container}>
      <TopBar title="Notificaciones" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

    </View>
  );
};

export default NotificationsPage;
