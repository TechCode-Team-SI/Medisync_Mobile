import React, { useEffect, useState } from 'react';
import { View, Text, Modal, AppState, AppStateStatus } from 'react-native';
import styles from './stylesModal';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, title, message }) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (visible) {
          onClose(); 
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, visible, onClose]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 5000); // en milisegundos
    }

    return () => {
      clearTimeout(timer);
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
          <Text className={styles.title2}>{title}</Text>
          <Text className={styles.message2}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
