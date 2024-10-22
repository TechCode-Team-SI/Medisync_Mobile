import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Animated,
  View,
  AppState,
} from "react-native";
import SideMenu from "./SideMenu";

interface SideMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideMenuModal: React.FC<SideMenuModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [menuAnimation] = useState(new Animated.Value(-300));

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background" && isVisible) {
        onClose();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [isVisible, onClose]);

  const openMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (isVisible) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "60%",
          backgroundColor: "#fff",
          transform: [{ translateX: menuAnimation }],
        }}
      >
        <SideMenu />
      </Animated.View>
    </Modal>
  );
};

export default SideMenuModal;

///USO
//const [isMenuVisible, setMenuVisible] = useState(false);
//const toggleMenu = () => {
//setMenuVisible(prev => !prev);};
///<SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
