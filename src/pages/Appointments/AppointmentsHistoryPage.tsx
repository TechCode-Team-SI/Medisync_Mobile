import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TopBar from "@/src/components/Navigation/TopBar";
import stylesAppointments from "@/src/components/AppointmentsComponents/stylesAppointments";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";
import { useFocusEffect } from "@react-navigation/native";

interface Appointment {
  id: number;
  specialization: string;
  code: string;
  date: string;
  time: string;
  rating: number;
}

const appointments: Appointment[] = [];

const AppointmentsHistoryPage: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false);
    }, [])
  );

  return (
    <View className={stylesAppointments.container}>
      <TopBar title="Historial de citas" onLeftPress={toggleMenu} />
      <SideMenuModal
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />

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

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {appointments.length === 0 ? (
          <Text className="text-lg text-center text-secondary mt-10">
            No tienes citas completadas
          </Text>
        ) : (
          appointments.map((appointment) => (
            <View
              key={appointment.id}
              className={stylesAppointments.cardHistory}
            >
              <FontAwesome6 name="stethoscope" size={30} color="#539091" />
              <View className="ml-4 flex-1">
                <Text className={stylesAppointments.textTitle3}>
                  {appointment.specialization}
                </Text>
                <View className="flex-row justify-between">
                  <Text className={stylesAppointments.textTitleItems}>
                    Código:
                  </Text>
                  <Text className="text-sm text-black ml-2">
                    {appointment.code}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={stylesAppointments.textTitleItems}>
                    Fecha:
                  </Text>
                  <Text className="text-sm text-black ml-2">
                    {appointment.date}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={stylesAppointments.textTitleItems}>
                    Hora:
                  </Text>
                  <Text className="text-sm text-black ml-2">
                    {appointment.time}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className={stylesAppointments.textTitleItems}>
                    Calificación:
                  </Text>
                  <View className="flex-row ml-2">
                    {[...Array(5)].map((_, index) => (
                      <Ionicons
                        key={index}
                        name={
                          index < appointment.rating ? "star" : "star-outline"
                        }
                        size={18}
                        color={
                          index < appointment.rating ? "#539091" : "#539091"
                        }
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AppointmentsHistoryPage;
