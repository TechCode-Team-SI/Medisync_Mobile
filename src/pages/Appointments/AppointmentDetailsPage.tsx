import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import stylesAppointments from '@/src/components/AppointmentsComponents/stylesAppointments';
import { useLocalSearchParams } from "expo-router"; 
import styles from "@/src/components/ProfileComponents/stylesProfile";
import ButtonBack from '@/src/components/Navigation/ButtonBack';



const AppointmentDetailsPage = () => {

  const { name, specialization, date, time, status, dni, doctor, gender, age} = useLocalSearchParams(); 
  console.log("userLocalSearchParams:", useLocalSearchParams());  


  return (
    <View className={styles.container}>
    <ButtonBack />
    <Text className={styles.title4}>Detalles de la cita</Text>

    <View className={styles.containerBg1}>

      <ScrollView showsVerticalScrollIndicator={false}>

      <View className='flex-row space-x-28 pb-2 '>
        <Text className='text-gray-500'>Fecha:  {date}</Text>
        <Text className='text-gray-500'>Hora:  {time}</Text>
      </View>

      <Text className={styles.title3}>Nombre del paciente</Text>
      <View className={styles.containerData2}>
          <Text>{name}</Text>
      </View>

      <Text className={styles.title3}>Cédula</Text>
      <View className={styles.containerData2}>
          <Text>{dni}</Text>
      </View>

      <Text className={styles.title3}>Sexo</Text>
      <View className={styles.containerData2}>
          <Text>{gender}</Text>
      </View>

      <Text className={styles.title3}>Edad</Text>
      <View className={styles.containerData2}>
          <Text>{age}</Text>
      </View>

      <Text className={styles.title3}>Especialidad</Text>
      <View className={styles.containerData2}>
          <Text>{specialization}</Text>
      </View>

      <Text className={styles.title3}>Médico</Text>
      <View className={styles.containerData2}>
          <Text>{doctor}</Text>
      </View>

      <Text className={styles.title3}>Estatus</Text>
      <View className={styles.containerData2}>
          <Text>{status}</Text>
      </View>

      </ScrollView>


    </View>
  </View>
 
);
}

export default AppointmentDetailsPage;