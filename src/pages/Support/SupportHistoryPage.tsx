import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import { getTickets } from "@/src/services/tickets/ticketsServices";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const SupportHistoryPage: React.FC = () => {
  const [tickets, setTickets] = useState<
    {
      id: string;
      title: string;
      description: string;
      type: string;
      status: string;
      createdAt: string;
    }[]
  >([]);

  const fetchTickets = async () => {
    const response = await getTickets();
    if (
      response.success &&
      response.data &&
      Array.isArray(response.data.data)
    ) {
      const ticketsList = response.data.data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        type: ticket.type,
        status: ticket.status,
        createdAt: ticket.createdAt,
      }));
      setTickets(ticketsList);
    } else {
      console.error("Error al obtener tickets:", response.message);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "complaint":
        return "Reclamo";
      case "suggestion":
        return "Sugerencia";
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    return status === "open" ? "Abierto" : status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES"),
      time: date.toLocaleTimeString("es-ES"),
    };
  };

  const handlePress = (ticket: any) => {
    router.push(
      `/chat?id=${encodeURIComponent(ticket.id)}&title=${encodeURIComponent(
        ticket.title
      )}&description=${encodeURIComponent(ticket.description)}`
    );
  };

  return (
    <View className="flex-1 bg-white">
      <TopBarBack title="Historial" />

      <View className="flex-1 p-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {tickets.length === 0 ? (
            <Text className="text-center text-gray-500 text-lg mt-4">
              No hay tickets creados
            </Text>
          ) : (
            tickets.map((ticket) => {
              const { date, time } = formatDate(ticket.createdAt);
              return (
                <TouchableOpacity
                  key={ticket.id}
                  className="bg-terciary p-4 mb-4 rounded-xl mx-1 shadow flex-row items-start"
                  onPress={() => handlePress(ticket)}
                >
                  <View className="bg-primary rounded-full p-2 mr-2 mt-4">
                    <MaterialCommunityIcons
                      name="headset"
                      size={36}
                      color="white"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      className="text-lg font-bold text-primary"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {ticket.title || "Título no disponible"}
                    </Text>
                    <Text className="text-xs text-gray-500 my-0.5">
                      Fecha: {date} Hora: {time}
                    </Text>
                    <Text className="text-sm text-cancel">
                      {getTypeLabel(ticket.type)}
                    </Text>
                    <Text className="text-base text-secondary font-extrabold">
                      {getStatusLabel(ticket.status)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SupportHistoryPage;
