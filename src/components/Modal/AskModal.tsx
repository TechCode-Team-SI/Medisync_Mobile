import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './stylesModal';

interface AskModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
  message: string; 
  onAccept: () => void; 
  onCancel: () => void; 
}

const AskModal: React.FC<AskModalProps> = ({ visible, onClose, title, message, onAccept, onCancel }) => {

  useEffect(() => {
    if (!visible) {
      onClose(); 
    }
  }, [visible]);

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
              onPress={onAccept} 
            >
              <Text className={styles.textButton}>Sí</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={styles.cancelButton}
              onPress={onCancel} 
            >
              <Text className={styles.textButton}>No</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
};

export default AskModal;
