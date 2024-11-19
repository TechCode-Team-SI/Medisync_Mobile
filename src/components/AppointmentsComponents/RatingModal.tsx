import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, AppState } from 'react-native';
import styles from '../Modal/stylesModal';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
  message: string; 
}

const RatingModal: React.FC<RatingModalProps> = ({ visible, onClose, title, message }) => {
  const [rating, setRating] = useState<number | null>(null);

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

  const handleStarPress = (index: number) => {
    setRating(index + 1);
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
          <View className={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <Text className={index < (rating || 0) ? styles.starFilled : styles.starEmpty}>★</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className={styles.containerButton}>

            <TouchableOpacity
                className={styles.acceptButton}
                onPress={onClose}
                >
                <Text className={styles.textButton}>Enviar</Text>
                </TouchableOpacity>

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

export default RatingModal;
