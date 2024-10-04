import React, { useEffect } from 'react';
import { View, Text, Modal } from 'react-native';
import styles from './stylesModal';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, title }) => {

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 50000); // en milisegundos
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
          
          
        </View>

      </View>
    </Modal>
  );
};

export default InfoModal;
