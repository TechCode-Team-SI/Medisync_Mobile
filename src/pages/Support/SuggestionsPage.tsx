import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, TextInput ,Alert,Button} from "react-native";
import styles from "@/src/components/SupportComponents/stylesSupport";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TopBarSupport from '@/src/components/SupportComponents/TopBarSupport';
import { Link, router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import AlertModal from '@/src/components/Modal/AlertModal';
import InfoModal from '@/src/components/Modal/InfoModal';

import { tickets } from "@/src/services/support/supportSuggestion";

const SuggestionsPage : React.FC = () => {

  const [inputTitle, setInputTitle] = useState(""); 
  const [inputDescription, setInputDescription] = useState(""); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = inputTitle !== '' && inputDescription !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [inputTitle, inputDescription]);

  useFocusEffect(
    React.useCallback(() => {
      setInputTitle('');
      setInputDescription('');
    }, [])
  );

  const handleTickets = async () => {
    const result = await tickets(inputTitle, inputDescription);

    if (result.success) {
     setShowSuccessModal(true);
     setInputTitle('');
      setInputDescription('');
    } else {
      setModalMessage(result.message);
     setShowErrorModal(true);
    }
  };

 
  return (
    <View className={styles.container}>
      <TopBarSupport title="Sugerencias" />

          <View className={styles.container3}>
            <MaterialCommunityIcons name="headset" size={100} color="#539091" />

            <Text className={styles.title1}>¿Tienes alguna sugerencia? Compártela con nosotros.</Text>

          </View>

          <View className={styles.container4}>

            <Text className={styles.text2}>Título</Text>
                <View className={styles.containerInput}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                    value={inputTitle}
                    onChangeText={setInputTitle}
            
                />
                </View>

            <Text className={styles.text3}>Descripción</Text>
                <View className={styles.containerInput2}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                    value={inputDescription}
                    onChangeText={setInputDescription}
                />
                </View>
                <TouchableOpacity 
                className={styles.button1}
                onPress={handleTickets}
                disabled={isButtonDisabled}
                style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
                  >
                  <Text className={styles.buttonText1}>Crear</Text>
                 
                </TouchableOpacity>
          </View>

          <InfoModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Registro exitoso!"
        />

        <AlertModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />

    </View>
  );
};

export default SuggestionsPage;