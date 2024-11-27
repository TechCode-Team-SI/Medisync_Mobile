import React, { useState, useEffect, useCallback} from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TopBar from "@/src/components/Navigation/TopBar";
import stylesAppointments from "@/src/components/AppointmentsComponents/stylesAppointments";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "@/src/components/ui/SearchBar";
import Loader from "@/src/components/ui/Loader";
import { router } from "expo-router";
import { Appointment, getRequestsMadeByMe } from "@/src/services/request/requestServices";
import { calculateAge } from "@/src/utils/calculateAge";
import { formatDate, formatGender, formatStatus } from "@/src/utils/changeFormat";

const AppointmentsHistoryPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
    }, [])
  );
  
  const fetchRequests = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await getRequestsMadeByMe(page);
      if (response.success && response.data && Array.isArray(response.data.data)) {
        const ticketsList = response.data.data.map((request: any) => ({
          id: request.id,
          name: request.patientFullName,
          dni: request.patientDNI,
          gender: formatGender(request.patientGender),
          age: calculateAge(request.patientBirthday),
          specialization: request.requestedSpecialty.name,
          doctor: request.requestedMedic ? request.requestedMedic.fullName : "De turno",
          status: formatStatus(request.status),
          date: formatDate(request.appointmentDate),
          time: request.appointmentHour,
          rating: request.rating,
        }))
        .filter((appointment: any) => ["Completada", "Cancelada"].includes(appointment.status));

        setAppointments((prevAppointments) => [...prevAppointments, ...ticketsList]);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests(currentPage);
  }, []);
   

  const handleAppointmentPress = (appointment: Appointment) => {
    const stars = appointment.rating?.stars || 0 ; 
    const review = appointment.rating?.review || "";
    
    router.push(
      `/appointmentdetails?id=${encodeURIComponent(
        appointment.id)}&name=${encodeURIComponent(
        appointment.name
      )}&age=${encodeURIComponent(appointment.age)}&gender=${encodeURIComponent(
        appointment.gender
      )}&doctor=${encodeURIComponent(
        appointment.doctor
      )}&specialization=${encodeURIComponent(
        appointment.specialization
      )}&date=${encodeURIComponent(appointment.date)}&time=${encodeURIComponent(
        appointment.time
      )}&status=${encodeURIComponent(
        appointment.status
      )}&dni=${encodeURIComponent(appointment.dni)}&stars=${encodeURIComponent(stars)}
      &review=${encodeURIComponent(review)}` 
    );
  };

  

  const handleScroll = ({ nativeEvent }: any) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;

    if (isCloseToBottom && currentPage < totalPages && !isLoading) {
      console.log(`Cargando más citas: Página ${currentPage + 1}`);
      fetchRequests(currentPage + 1);
    }
  };

  return (
    <View className={stylesAppointments.container}>
      <TopBar title="Historial de citas" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View className={stylesAppointments.card}>
        <ScrollView
         className="flex-1"
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} 
            keyboardShouldPersistTaps="handled" 
        >
          {appointments.length === 0 && !isLoading && (
            <View className="py-8">
              <Text className="text-center text-lg text-gray-400 font-bold">No hay citas registradas</Text>
            </View>
          )}
           {(appointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                className={stylesAppointments.cardcolor}
                activeOpacity={0.7}
                onPress={() => handleAppointmentPress(appointment)}
              >
                <View className="flex-row items-center">
                  <FontAwesome6 name="file-medical" size={30} color="#539091" />
                  <View className="ml-4 flex-1">
                    <Text className={stylesAppointments.textTitle3}>
                      {appointment.name}
                    </Text>
                    <View className="flex-row justify-between">
                      <Text className={stylesAppointments.item}>
                        Fecha: {appointment.date}
                      </Text>
                      <Text className={stylesAppointments.item}>
                        Hora: {appointment.time}
                      </Text>
                    </View>
                    <Text className={stylesAppointments.item2}>
                      {appointment.specialization}
                    </Text>
                    <Text className={stylesAppointments.item3}>
                      {appointment.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          {isLoading && (
            <View className="py-4">
              <Loader /> 
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default AppointmentsHistoryPage;
