import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import { getTickets } from "@/src/services/tickets/ticketsServices";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import Loader from "@/src/components/ui/Loader";
import styles from "@/src/components/SupportComponents/StylesSupportHistory";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTickets = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getTypeLabel = (type: string) =>
    type === "complaint"
      ? "Reclamo"
      : type === "suggestion"
      ? "Sugerencia"
      : type;
  const getStatusLabel = (status: string) =>
    status === "open" ? "Abierto" : status;
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <TopBarBack title="Historial" />
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBarBack title="Historial" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {tickets.map((ticket) => {
          const { date, time } = formatDate(ticket.createdAt);
          return (
            <TouchableOpacity
              key={ticket.id}
              style={styles.ticketButton}
              onPress={() => handlePress(ticket)}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="headset"
                  size={36}
                  color="white"
                />
              </View>
              <View style={styles.ticketContent}>
                <Text
                  style={styles.title}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {ticket.title || "Título no disponible"}
                </Text>
                <Text style={styles.dateText}>
                  Fecha: {date} Hora: {time}
                </Text>
                <Text style={styles.typeText}>{getTypeLabel(ticket.type)}</Text>
                <Text style={styles.statusText}>
                  {getStatusLabel(ticket.status)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SupportHistoryPage;
