import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../Modal/stylesModal';
import { rateRequest, CreateRatingDto } from "@/src/services/appointments/rateServices";
import AlertModal from '../Modal/AlertModal';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentId: number;
  onRatingSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ visible, onClose, appointmentId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 

  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmitRating = async () => {
    if (rating !== null) {
      const ratingData: CreateRatingDto = { stars: rating };
      const result = await rateRequest(appointmentId, ratingData);

      if (result.success) {
        setAlertMessage('La calificación se envió con éxito');
        setAlertVisible(true);
        console.log(`Calificación enviada: ${rating} estrellas`);
      } else {
        setAlertMessage('Hubo un problema al enviar la calificación');
        setAlertVisible(true);
      }
    }
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
          <Text className={styles.title}>Califica el Servicio</Text>
          <Text className={styles.message}>¡Ayudanos a mejorar!</Text>
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
              onPress={handleSubmitRating}
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


      <AlertModal
        visible={alertVisible}
        title='ATENCIÓN'
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          onClose(); 
        }}
      />
    </Modal>
  );
};

export default RatingModal;
