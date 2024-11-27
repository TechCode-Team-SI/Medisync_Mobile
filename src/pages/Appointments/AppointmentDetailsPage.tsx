import React, { useEffect, useState } from 'react'; 
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'; 
import { useLocalSearchParams } from "expo-router";
import styles from "@/src/components/ProfileComponents/stylesProfile";
import { Appointment, getAppointmentDetails } from "@/src/services/request/getRequestServices";
import ButtonBack from "@/src/components/Navigation/ButtonBack";

const AppointmentDetailsPage = () => { 
 
  const { id, name, specialization, date, time, status, dni, doctor, gender, age, stars, review} = useLocalSearchParams();  
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    if (!id || Array.isArray(id)) {
      console.error("ID inválido:", id);
      setLoading(false);
      return;
    }
    const result = await getAppointmentDetails(id);
    if (result.success && result.data) {
      setAppointment(result.data);
      appointment?.fields.map((field) => {
       
        if (field.type === "text") {
          console.log("Valor:", field.value);
        } else if (field.type === "selection") {
          field.selections?.forEach((selection) =>
            console.log("Selección:", selection.value)
          );
        }
      });
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };


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
      
      <Text className="text-center font-montserrat text-lg text-primary py-3">Detalles de la consulta</Text>

     
      {appointment?.fields.map((field, index) => (
        <View key={index}>
          <Text className={styles.title3}>{field.label}</Text>
          {field.type === "text" && field.value && (
            <View className={styles.containerData2}>
              <Text>{field.value}</Text>
            </View>
          )}
          {field.type === "selection" && field.selections && (
            <View >
              {field.selections
                .filter((selection) => selection.isSelected) 
                .map((selected, idx) => (
                  <Text key={idx}> {selected.value}</Text> 
                ))}
            </View>
          )}
        </View>
      ))}

      {status === "Completada" && (
        <>
          <Text className={styles.title3}>Calificación</Text>
          <View className={styles.containerData2}>
            <Text> {stars} </Text>
          </View>

          {review && (
              <>
            <Text className={styles.title3}>Comentario</Text>
            <View className={styles.containerData2}>
              <Text> {review} </Text>
            </View>
            </>
          )}
        </>
      )}
 
      </ScrollView> 
 
 
    </View> 
  </View> 
  
); 
} 
 
export default AppointmentDetailsPage;