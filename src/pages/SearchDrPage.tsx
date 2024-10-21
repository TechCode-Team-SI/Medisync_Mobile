import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styles from '@/src/components/Styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router'; // Usa el router aquí
import AskModal from '../components/Modal/AskModal';
import { Dr } from "@/src/services/auth/authDr";

const SearchDrPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { doctors, specialtyName } = useLocalSearchParams();

  const [drs, setdrs]  = useState<Dr[]>([]);

  useEffect(() => {
    if (doctors) {
      console.log('Doctores recibidos:', doctors);
      setdrs(JSON.parse(doctors as string)); // Parsear el string JSON a un array de objetos
    }
  }, [doctors]);

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
      <Text className={styles.title1}>{specialtyName}</Text>

      <View className={styles.containerBg2}>
        <Text className={styles.title2}>Especialistas Disponibles</Text>
        <View className={styles.container}>
        {drs.map((dr) => (
          <TouchableOpacity
          key={dr.id}
            className={styles.button2}
            onPress={handleSelect}>
            <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. {dr.fullName || 'Nombre no disponible'}</Text>
          </TouchableOpacity>
           ))}
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
