import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TopBar from '@/src/components/navigation/TopBar';
import stylesAppointments from '@/src/components/AppointmentsComponents/stylesAppointments';

interface Appointment {
  id: number;
  specialization: string;
  code: string;
  date: string;
  time: string;
  rating: number;
}

const appointments: Appointment[] = [
  { id: 1, specialization: 'Especialidad', code: 'as2d4hjk', date: '12/10/2023', time: '12:00 PM', rating: 1 },
  { id: 2, specialization: 'Especialidad', code: 'as2d4hjk', date: '12/10/2023', time: '12:00 PM', rating: 5 },
  { id: 3, specialization: 'Especialidad', code: 'as2d4hjk', date: '12/10/2023', time: '12:00 PM', rating: 3 },
  { id: 4, specialization: 'Especialidad', code: 'as2d4hjk', date: '12/10/2023', time: '12:00 PM', rating: 2 },
];

const AppointmentsHistoryPage: React.FC = () => {
  return (
    <View className={stylesAppointments.container}>
    
      <TopBar
        title="Historial de Citas"
        onLeftPress={() => console.log('Left pressed')}
      />

      {/* Search Bar */}
      <View className={stylesAppointments.searchBar}>
        <TextInput
          placeholder=""
          placeholderTextColor="primary"
          className={stylesAppointments.searchInput}
        />
        <TouchableOpacity>
          <Ionicons name="search" size={20} color="#539091" />
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {appointments.map((appointment) => (
          <View
            key={appointment.id}
            className={stylesAppointments.cardHistory}
          >
            <FontAwesome6 name="stethoscope" size={30} color='#539091'/>
            <View className="ml-4 flex-1">
              <Text className={stylesAppointments.textTitle3}>{appointment.specialization}</Text>
              <View className="flex-row justify-between">
                <Text className={stylesAppointments.textTitleItems}>Código:</Text>
                <Text className="text-sm text-black ml-2">{appointment.code}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={stylesAppointments.textTitleItems}>Fecha:</Text>
                <Text className="text-sm text-black ml-2">{appointment.date}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={stylesAppointments.textTitleItems}>Hora:</Text>
                <Text className="text-sm text-black ml-2">{appointment.time}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className={stylesAppointments.textTitleItems}>Calificación:</Text>
                <View className="flex-row ml-2">
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name={index < appointment.rating ? "star" : "star-outline"}
                      size={18}
                      color={index < appointment.rating ? "#539091" : "#539091"}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AppointmentsHistoryPage;


