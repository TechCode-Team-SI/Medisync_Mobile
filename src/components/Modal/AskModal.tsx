///ARREGLAR DETALLES 

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './stylesModal';

interface AskModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
  message: string; 
}

const AskModal: React.FC<AskModalProps> = ({ visible, onClose, title, message  }) => {
  const router = useRouter();

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
              onPress={() => {
                router.push('/createappointment'); ///cambiar esto
                onClose(); 
              }}
            >
              <Text className={styles.textButton}>Si</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={styles.cancelButton}
              onPress={() => {
                router.push('/createappointmenttwo'); ///cambiar esto
                onClose(); 
              }}
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
