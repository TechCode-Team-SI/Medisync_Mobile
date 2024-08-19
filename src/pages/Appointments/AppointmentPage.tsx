import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '@/src/components/TopBar';
import stylesApointments from '@/src/components/AppointmentComponents/stylesAppointments';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Appointment {
  id: number;
  name: string;
  specialization: string;
  status: string;
  date: string;
  time: string;
}

const appointments: Appointment[] = [
  { id: 1, name: 'Nombres Apellido', specialization: 'Especialidad ', status: 'Pendiente', date: '15-08-2024', time: '02:30 pm' },
  { id: 2, name: 'Nombres Apellido', specialization: 'Especialidad ', status: 'Confirmado', date: '16-08-2024', time: '10:00 am' },
  { id: 3, name: 'Nombres Apellido', specialization: 'Especialidad ', status: 'En progreso', date: '17-08-2024', time: '09:00 am' },
  { id: 4, name: 'Nombres Apellido', specialization: 'Especialidad ', status: 'Finalizado', date: '18-08-2024', time: '11:30 am' },
  { id: 5, name: 'Nombres Apellido', specialization: 'Especialidad ', status: 'Pendiente', date: '19-08-2024', time: '04:00 pm' },
];

const AppointmentPage: React.FC = () => {
  const handleDelete = (id: number) => {
    console.log(`Eliminar cita con id: ${id}`);
  };

  const handleAddAppointment = () => {
    console.log('Agregar nueva cita');
  };

  return (
    <View className={stylesApointments .container}>
      <TopBar
        title="Citas"
        onLeftPress={() => console.log('Left pressed')}
      />
      <View className={stylesApointments .card}>
        <View className={stylesApointments .button1}>
          <Text className={stylesApointments .title}>Tus citas</Text>
          <TouchableOpacity
            className={stylesApointments .button1Color}
            activeOpacity={0.7}
            onPress={handleAddAppointment}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
        
        {/*  margen superior de las tarjetas */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}>
          {appointments.map((appointment) => (
            <View
              key={appointment.id}
              className={stylesApointments .cardcolor}
            >
              <TouchableOpacity
                className={stylesApointments .button2}
                activeOpacity={0.7}
                onPress={() => handleDelete(appointment.id)}
              >
                <AntDesign name="closecircleo" size={22} color="black" />
              </TouchableOpacity>
              
              <View className="flex-row items-center">
                <FontAwesome6 name="file-medical" size={30} color='#539091'/>
                <View className="ml-4 flex-1">
                  <Text className={stylesApointments .textTitle3}>{appointment.name}</Text>
                  <View className="flex-row justify-between">
                    <Text className={stylesApointments.item}>{appointment.date}</Text>
                    <Text className={stylesApointments.item}>{appointment.time}</Text>
                  </View>
                  <Text className={stylesApointments.item2}>{appointment.specialization}</Text>
                  <Text className={stylesApointments.item3}>{appointment.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AppointmentPage;
