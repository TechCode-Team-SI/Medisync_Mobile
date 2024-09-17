/// ARREGLAR/////

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput} from "react-native";
import styles from "@/src/components/AppointmentsComponents/stylesCreate";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';


const CreateAppointmentPage: React.FC = () => {

  return (
    <View className={styles.container} >

        <ButtonBack/>

        <Text className={styles.title1}> Agenda tu cita </Text>

        <View className={styles.containerBg1}>

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

            <Text className={styles.text}>Patología</Text>
            <View className={styles.containerInput}>
                <TextInput
                className={styles.input}
                placeholder="Detalle su patología (s)"
                placeholderTextColor="#539091"
              />
            </View>

            <View className={styles.container2}>
                <TouchableOpacity
                className={styles.button1}>
                <Text className={styles.buttonText1}>Agendar</Text>
                </TouchableOpacity>
            </View>

        </View>

    </View>
  );
};

export default CreateAppointmentPage;