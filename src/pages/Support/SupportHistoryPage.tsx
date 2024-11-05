import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import { getTickets } from "@/src/services/tickets/ticketsServices";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import Loader from "../../components/ui/Loader";
import styles from "@/src/components/SupportComponents/stylesSupport";

const SupportHistoryPage: React.FC = () => {
  const router = useRouter();
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
    setLoading(false);
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

  if (loading) {
    return (
      <View className={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <View className={styles.containerHistory}>
      <TopBarBack title="Historial" />
      <View className={styles.containerItem}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tickets.map((ticket) => {
            const { date, time } = formatDate(ticket.createdAt);
            return (
              <TouchableOpacity
                key={ticket.id}
                className={styles.button}
                onPress={() => handlePress(ticket)}
              >
                <View className={styles.icon}>
                  <MaterialCommunityIcons
                    name="headset"
                    size={36}
                    color="white"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    className={styles.titleHistory}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {ticket.title || "Título no disponible"}
                  </Text>
                  <Text className={styles.text2}>
                    Fecha: {date} Hora: {time}
                  </Text>
                  <Text className={styles.text3}>
                    {getTypeLabel(ticket.type)}
                  </Text>
                  <Text className={styles.buttonText1}>
                    {getStatusLabel(ticket.status)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SupportHistoryPage;
