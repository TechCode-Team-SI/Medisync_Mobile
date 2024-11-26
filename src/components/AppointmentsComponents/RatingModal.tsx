import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../Modal/stylesModal';
import { rateRequest, CreateRating } from "@/src/services/appointments/rateServices";
import AlertModal from '../Modal/AlertModal';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  onRatingSubmit: (rating: number, review: string) => void; 
}

const RatingModal: React.FC<RatingModalProps> = ({ visible, onClose, appointmentId, onRatingSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>(''); 
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 

  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmitRating = async () => {
    if (!appointmentId) return;

    console.log("ID de cita para calificar:", appointmentId);

    if (rating === null) {
      setAlertMessage("Ingrese la calificación"); 
      setAlertVisible(true); 
      return;
    }
  
    const ratingData: CreateRating = { 
      stars: rating, 
      review: review 
    };
  
    const result = await rateRequest(appointmentId, ratingData);

    if (result.success) {
      setAlertMessage("La calificación se envió con éxito");
      setAlertVisible(true);
      console.log(`Calificación enviada: ${rating} estrellas con reseña: ${review}`);

      onRatingSubmit(rating, review); 

      setRating(null);
      setReview("");
    } else {
      setAlertMessage(result.success || "Hubo un problema al enviar la calificación");
      setAlertVisible(true);
    }
  };
  
  const handleCloseModal = () => {
    setRating(null);
    setReview('');
    onClose();
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertMessage !== "Ingrese la calificación") {
      handleCloseModal();
    }
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible && !alertVisible} 
        onRequestClose={handleCloseModal}
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

            <TextInput
              className="flex-row items-center bg-bgInput w-full p-2 h-11 mb-6 rounded-lg" 
              placeholder="Realiza un comentario..."
              value={review}
              onChangeText={setReview}
              multiline
              numberOfLines={4}
            />

            <View className={styles.containerButton}>
              <TouchableOpacity
                className={styles.acceptButton}
                onPress={handleSubmitRating}
              >
                <Text className={styles.textButton}>Enviar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={styles.cancelButton}
                onPress={handleCloseModal}
              >
                <Text className={styles.textButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AlertModal
        visible={alertVisible}
        title='ATENCIÓN'
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </>
  );
};

export default RatingModal;
