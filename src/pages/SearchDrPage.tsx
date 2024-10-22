import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/Styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router'; // Usa el router aquí
import AskModal from '../components/Modal/AskModal';

const SearchDrPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleSelect = () => {
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setModalVisible(false); 
  };

  const handleAccept = () => {
    router.push('/createappointment');
    handleCloseModal();
  };

  const handleCancel = () => {
    router.push('/createappointmenttwo');
    handleCloseModal();
  };

  return (
    <View className={styles.container1}>
      <ButtonBack/>
      <Text className={styles.title1}>Especialidad</Text>

      <View className={styles.containerBg2}>
        <Text className={styles.title2}>Especialistas Disponibles</Text>

        <View className={styles.container}>
          <TouchableOpacity
            className={styles.button2}
            onPress={handleSelect}>
            <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. Lorem Ipsum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={styles.button2}
            onPress={handleSelect}>
            <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. Lorem Ipsum</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AskModal 
        visible={modalVisible} 
        onClose={handleCloseModal}
        title="Agenda tu cita"
        message="¿El paciente está registrado?"
        onAccept={handleAccept} 
        onCancel={handleCancel} 
      />
    </View>
  );
};

export default SearchDrPage;
