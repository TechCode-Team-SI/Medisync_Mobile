import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TopBar from "@/src/components/Navigation/TopBar";
import stylesAppointments from "@/src/components/AppointmentsComponents/stylesAppointments";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "@/src/components/ui/SearchBar";

import { Appointment } from "@/src/services/request/requestServices";
import {
  formatDate,
  formatGender,
  formatStatus,
} from "@/src/utils/changeFormat";
import { getRequestsMadeByMe } from "@/src/services/request/requestServices";
import { calculateAge } from "@/src/utils/calculateAge";
import Loader from "@/src/components/ui/Loader";
import { router } from "expo-router";

const AppointmentsHistoryPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
      fetchRequests();
    }, [])
  );

  const fetchRequests = async () => {
    setLoading(true);
    const result = await getRequestsMadeByMe();
    if (result.success) {
      const formattedAppointments: Appointment[] = result.data.map(
        (request: any) => ({
          id: request.id,
          name: request.patientFullName,
          dni: request.patientDNI,
          gender: formatGender(request.patientGender),
          age: calculateAge(request.patientBirthday),
          specialization: request.requestedSpecialty.name,
          doctor: request.requestedMedic
            ? request.requestedMedic.fullName
            : "De turno",
          status: formatStatus(request.status),
          date: formatDate(request.appointmentDate),
          time: request.appointmentHour,
        })
      );

      const filteredAppointments = formattedAppointments.filter(
        (appointment: Appointment) =>
          appointment.status === "Cancelada" ||
          appointment.status === "Completada"
      );

      setAppointments(filteredAppointments);
    } else {
      console.log(result.message);
    }
    setLoading(false);
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    router.push(
      `/appointmentdetails?name=${encodeURIComponent(
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
      )}&dni=${encodeURIComponent(appointment.dni)}`
    );
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.specialization
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  return (
    <View className={stylesAppointments.container}>
      <TopBar title="Historial de citas" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View className="items-center flex-row pt-6 mx-5">
        <SearchBar
          placeholder="Buscar por paciente o servicio"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <View className={stylesAppointments.card}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <Loader />
          ) : (
            filteredAppointments.map((appointment) => (
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
        </ScrollView>
      </View>
    </View>
  );
};

export default AppointmentsHistoryPage;
