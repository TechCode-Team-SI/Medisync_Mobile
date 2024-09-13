import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '@/src/components/navigation/TopBar';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import stylesAppointments from '@/src/components/AppointmentsComponents/stylesAppointments';

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

  const handleAppointmentPress = (id: number) => {
    console.log(`Abrir detalles de cita con id: ${id}`);
    
  };

  const handleAddAppointment = () => {
    console.log('Agregar nueva cita');
  };

  return (
    <View className={stylesAppointments.container}>
      <TopBar
        title="Citas"
        onLeftPress={() => console.log('Left pressed')}
      />
      <View className={stylesAppointments.card}>
        <View className={stylesAppointments.button1}>
          <Text className={stylesAppointments.title}>Tus citas</Text>
          <TouchableOpacity
            className={stylesAppointments.button1Color}
            activeOpacity={0.7}
            onPress={handleAddAppointment}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}>
          {appointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              className={stylesAppointments.cardcolor}
              activeOpacity={0.7}
              onPress={() => handleAppointmentPress(appointment.id)}
            >
              <TouchableOpacity
                className={stylesAppointments.button2}
                activeOpacity={0.7}
                onPress={() => handleDelete(appointment.id)}
              >
                <AntDesign name="closecircleo" size={22} color="black" />
              </TouchableOpacity>
              
              <View className="flex-row items-center">
                <FontAwesome6 name="file-medical" size={30} color='#539091'/>
                <View className="ml-4 flex-1">
                  <Text className={stylesAppointments.textTitle3}>{appointment.name}</Text>
                  <View className="flex-row justify-between">
                    <Text className={stylesAppointments.item}>{appointment.date}</Text>
                    <Text className={stylesAppointments.item}>{appointment.time}</Text>
                  </View>
                  <Text className={stylesAppointments.item2}>{appointment.specialization}</Text>
                  <Text className={stylesAppointments.item3}>{appointment.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AppointmentPage;
