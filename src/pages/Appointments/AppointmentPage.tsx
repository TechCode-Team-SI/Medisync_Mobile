import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "@/src/components/Navigation/TopBar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import stylesAppointments from "@/src/components/AppointmentsComponents/stylesAppointments";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { getRequestsMadeByMe } from "@/src/services/request/requestServices";
import {
  formatDate,
  formatGender,
  formatStatus,
} from "@/src/utils/changeFormat";
import { calculateAge } from "@/src/utils/calculateAge";
import Loader from "@/src/components/ui/Loader";
import RatingModal from "@/src/components/AppointmentsComponents/RatingModal";
import AskModal from "@/src/components/Modal/AskModal";
import AlertModal from "@/src/components/Modal/AlertModal";
import { cancelRequest } from "@/src/services/appointments/cancelServices";

import { Appointment } from "@/src/services/request/requestServices";

const AppointmentPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAskModalVisible, setAskModalVisible] = useState(false);
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAlertModalVisible, setAlertModalVisible] = useState(false);

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
      const formattedAppointments = result.data.map((request: any) => ({
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
      }));

      const filteredAppointments = formattedAppointments.filter(
        (appointment: Appointment) =>
          appointment.status === "Pendiente" ||
          appointment.status === "Completada" ||
          appointment.status === "Completada"
      );

      setAppointments(filteredAppointments);
    } else {
      console.log(result.message);
    }
    setLoading(false);
  };

  const handleOptionPress = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    if (appointment.status === "Pendiente") {
      setAskModalVisible(true);
    } else if (appointment.status === "Completada") {
      setRatingModalVisible(true);
    }
  };

  const handleAddAppointment = () => {
    router.push("/search");
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

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    setLoading(true);
    const result = await cancelRequest(selectedAppointment.id);

    if ("message" in result) {
      console.log(result.message);
    } else if (result.success) {
      setAskModalVisible(false);
      setAlertModalVisible(true);
      fetchRequests();
    }

    setLoading(false);
  };

  const handleRatingSubmit = (rating: number) => {
    console.log(`Calificación enviada: ${rating} estrellas`);
    setAlertModalVisible(true);
  };

  return (
    <View className={stylesAppointments.container}>
      <TopBar title="Citas" onLeftPress={toggleMenu} />

      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <Loader />
          ) : (
            appointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                className={stylesAppointments.cardcolor}
                activeOpacity={0.7}
                onPress={() => handleAppointmentPress(appointment)}
              >
                {(appointment.status === "Pendiente" ||
                  appointment.status === "Completada") && (
                  <TouchableOpacity
                    className={stylesAppointments.button2}
                    activeOpacity={0.7}
                    onPress={() => handleOptionPress(appointment)}
                  >
                    <Ionicons
                      name="ellipsis-vertical-circle-sharp"
                      size={32}
                      color="#539091"
                    />
                  </TouchableOpacity>
                )}

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

      <AskModal
        visible={isAskModalVisible}
        onClose={() => setAskModalVisible(false)}
        title="Cancelar Cita"
        message="¿Estás seguro que desea cancelar su cita?"
        onAccept={handleCancelAppointment}
        onCancel={() => setAskModalVisible(false)}
      />

      <RatingModal
        visible={isRatingModalVisible}
        onClose={() => setRatingModalVisible(false)}
        appointmentId={selectedAppointment ? selectedAppointment.id : 0}
        onRatingSubmit={handleRatingSubmit}
      />

      <AlertModal
        visible={isAlertModalVisible}
        onClose={() => setAlertModalVisible(false)}
        title="ATENCIÓN"
        message="Su cita ha sido cancelada con éxito."
      />
    </View>
  );
};

export default AppointmentPage;
