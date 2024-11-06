import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, AppState } from 'react-native';
import styles from '../Modal/stylesModal';

interface AppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
  message: string; 
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ visible, onClose, title, message }) => {

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
              className={styles.cancelButton}
              onPress={onClose}
            >
              <Text className={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentModal;

