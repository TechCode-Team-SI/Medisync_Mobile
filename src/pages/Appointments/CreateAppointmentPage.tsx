/// ARREGLAR/////

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import styles from "@/src/components/AppointmentsComponents/stylesCreate";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CreateAppointmentPage: React.FC = () => {

  return (
    <View className={styles.container} >

        <ButtonBack/>

        <Text className={styles.title1}> Agenda tu cita </Text>
        

        <ScrollView className={styles.containerBg1} >  

            <Text className={styles.title2}>Paciente registrado</Text>

            <Text className={styles.text}>Nombres</Text>
            <View className={styles.containerData}>
                <Text>Nombre y Apellido</Text>
            </View>

            <Text className={styles.text}>Cédula</Text>
            <View className={styles.containerData}>
                <Text>11.111.111</Text>
            </View>

            <Text className={styles.text}>Edad</Text>
            <View className={styles.containerData}>
                <Text>Años</Text>
            </View>

            <Text className={styles.text}>Tipo de sangre</Text>
            <View className={styles.containerData}>
                <Text>Alguno</Text>
            </View>

            <View className={styles.container2}>
                <TouchableOpacity
                className={styles.buttonDate}>
                <View className={styles.icon}><Ionicons name="calendar" size={24} color="white" /></View>
                <Text className={styles.textDate}>Seleccione la fecha</Text>
                </TouchableOpacity>
            </View>

            <View className={styles.container2}>
                <TouchableOpacity
                className={styles.buttonDate}>
                <View className={styles.icon}><MaterialIcons name="keyboard-arrow-down" size={24} color="white" /></View>
                <Text className={styles.textDate}>Horarios</Text>
                </TouchableOpacity>
            </View>

            <View className={styles.container2}>
                <TouchableOpacity
                className={styles.button1}>
                <Text className={styles.buttonText1}>Agendar</Text>
                </TouchableOpacity>
            </View>

        </ScrollView> 
        
    </View>
  );
};

export default CreateAppointmentPage;