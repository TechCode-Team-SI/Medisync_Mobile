import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, AppState } from 'react-native';
import styles from './stylesModal';

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onAccept?: () => void;  
}

const AlertModal: React.FC<AlertModalProps> = ({ visible, onClose, title, message, onAccept }) => {

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background" && visible) {
        onClose();
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [visible, onClose]);

  const handleAccept = () => {
    if (onAccept) {
      onAccept();  
    }
    onClose();  
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <View className={styles.container}>
          <Text className={styles.title}>{title}</Text>
          <Text className={styles.message}>{message}</Text>
          <View className={styles.containerButton}>
            <TouchableOpacity
              className={styles.acceptButton}
              onPress={handleAccept}  
            >
              <Text className={styles.textButton}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

