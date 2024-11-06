import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '@/src/components/Navigation/TopBar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import stylesAppointments from '@/src/components/AppointmentsComponents/stylesAppointments';
import { router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { getRequestsMadeByMe } from "@/src/services/request/requestServices";
import { formatDate, formatGender, formatStatus } from "@/src/utils/changeFormat";
import { calculateAge } from "@/src/utils/calculateAge";
import AppointmentModal from '@/src/components/AppointmentsComponents/AppointmentModal'; 

interface Appointment {
  id: number;
  name: string;
  dni: string;
  specialization: string;
  status: string;
  date: string;
  time: string;
  doctor: string;
  gender: string;
  age: string;
}

const AppointmentPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); 
  const [modalTitle, setModalTitle] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
      fetchRequests();
    }, [])
  );

  const fetchRequests = async () => {
    const result = await getRequestsMadeByMe();
    if (result.success) {
      const formattedAppointments = result.data.map((request: any) => ({
        id: request.id,
        name: request.patientFullName,
        dni: request.patientDNI,
        gender: formatGender(request.madeFor.gender),
        age: calculateAge(request.madeFor.birthday),
        specialization: request.requestedSpecialty.name, 
        doctor: request.requestedMedic.fullName,
        status: formatStatus(request.status), 
        date: formatDate(request.appointmentDate), 
        time: request.appointmentHour,
      }));
      setAppointments(formattedAppointments);
      console.log(formattedAppointments);
    } else {
      console.log(result.message);
    }
  };

  const handleOption = () => {
    setModalTitle('Título del Modal'); 
    setModalMessage('Este es el mensaje del modal.'); 
    setModalVisible(true); 
  };

  const handleAddAppointment = () => {
    router.push("/search");
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    router.push(`/appointmentdetails?name=${encodeURIComponent(appointment.name)}&age=${encodeURIComponent(appointment.age)}&gender=${encodeURIComponent(appointment.gender)}&doctor=${encodeURIComponent(appointment.doctor)}&specialization=${encodeURIComponent(appointment.specialization)}&date=${encodeURIComponent(appointment.date)}&time=${encodeURIComponent(appointment.time)}&status=${encodeURIComponent(appointment.status)}&dni=${encodeURIComponent(appointment.dni)}`);
  };

  return (
    <View className={stylesAppointments.container}>
      <TopBar title="Citas" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

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
        
        <ScrollView contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {appointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              className={stylesAppointments.cardcolor}
              activeOpacity={0.7}
              onPress={() => handleAppointmentPress(appointment)}
            >
              <TouchableOpacity
                className={stylesAppointments.button2}
                activeOpacity={0.7}
                onPress={handleOption} 
              >
                <Ionicons name="ellipsis-vertical-circle-sharp" size={32} color="#539091" />
              </TouchableOpacity>
              
              <View className="flex-row items-center">
                <FontAwesome6 name="file-medical" size={30} color='#539091'/>
                <View className="ml-4 flex-1">
                  <Text className={stylesAppointments.textTitle3}>{appointment.name}</Text>
                  <View className="flex-row justify-between">
                    <Text className={stylesAppointments.item}>Fecha: {appointment.date}</Text>
                    <Text className={stylesAppointments.item}>Hora: {appointment.time}</Text>
                  </View>
                  <Text className={stylesAppointments.item2}>{appointment.specialization}</Text>
                  <Text className={stylesAppointments.item3}>{appointment.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <AppointmentModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        title="ATENCIÓN" 
        message="¿Seguro que desea cancelar su cita?"
      />
    </View>
  );
};

export default AppointmentPage;

