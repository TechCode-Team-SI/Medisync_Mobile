import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import stylesAppointments from '@/src/components/AppointmentsComponents/stylesAppointments';

interface FieldProps {
  label: string;
  value: string;
  editable?: boolean;
  extraClass?: string;
}

const AppointmentDetailsPage = () => {
  const [patologia] = useState("Patologia");

  return (
    <ScrollView className={stylesAppointments.containerDetail2}>
      
      <View className={stylesAppointments.headerDetail}>
        <TouchableOpacity className="ml-3 rounded-md ">
        <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text className={stylesAppointments.titleDetail}>Detalles</Text>
        <View className="w-6" />
      </View>

      <View className={stylesAppointments.containerDetail}>
        {/* Fecha y Hora */}
        <View className={stylesAppointments.separation}>
          <View className={stylesAppointments.separation2}>
            <Text className={stylesAppointments.textTitleItems}>Fecha:</Text>
            <Text className={stylesAppointments.textDate}>{`xx/xx/xxxx`}</Text>
            <Text className={stylesAppointments.textTitleItems }>Hora:</Text>
            <Text className={stylesAppointments.textDate}>{`00:00 xx`}</Text>
          </View>
          
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <Field label="Nombre" value="Nombre y Apellido" />
          <Field label="Cédula" value="11.111.111" />
          <Field label="Edad" value="Años" />
          <Field label="Género" value="Alguno" />
          <Field label="Tipo de sangre" value="A+" />
          <Field 
            label="Patologías" 
            value={patologia} 
            editable 
            extraClass="bg-terciary" 
          />
          <Field label="Especialidad" value="Especialidad" />
          <Field label="Médico" value="Nombre y Apellido" />
          <Field label="Estatus" value="Pendiente" />
        </View>
      </View>
    </ScrollView>
  );
};

const Field: React.FC<FieldProps> = ({ label, value, editable = false, extraClass = "" }) => (
  <View className="px-2">
    <Text className={stylesAppointments.textTitle}>{label}</Text>
    {editable ? (
     
     
     /* Cajitas imput */
     <TextInput 
        className={`p-3 rounded-md ${extraClass}`} 
        value={value} 
        onChangeText={() => {}}
      />
    ) : (
      <View className={`bg-bgMenu p-3 rounded-md ${extraClass}`}>
        <Text className="text-bg-cancel">{value}</Text>
      </View>
    )}
  </View>
);

export default AppointmentDetailsPage;