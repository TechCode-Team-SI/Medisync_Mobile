import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, router } from "expo-router";
import AskModal from '../components/AppointmentsComponents/AskModal';

const SearchDrPage: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = () => {
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setModalVisible(false); 
  };

    return (
        <View className={styles.container1}>

         <ButtonBack/>
         <Text className={styles.title1}>Especialidad</Text>

          <View className={styles.containerBg2}>

            <Text className={styles.title2}> Especialistas Disponibles</Text>

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

          <AskModal visible={modalVisible} onClose={handleCloseModal} />

        </View>
      );
};

export default SearchDrPage;