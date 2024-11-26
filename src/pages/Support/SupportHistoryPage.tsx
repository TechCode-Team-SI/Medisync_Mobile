import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import TopBarBack from '@/src/components/Navigation/TopBarBack';
import { getTickets } from '@/src/services/tickets/ticketsServices';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { getTypeLabel, getStatusLabel, formatDate } from '@/src/utils/support/changeLabel';
import Loader from '@/src/components/ui/Loader'; 

const SupportHistoryPage: React.FC = () => {
  const [tickets, setTickets] = useState<{
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    createdAt: string;
    ticketTag?: { name: string };
  }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTickets = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await getTickets(page);
    console.log("Respuesta de getTickets:", response.data);
    if (response.success && response.data && Array.isArray(response.data.data)) {
      const ticketsList = response.data.data.map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        type: ticket.type,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketTag: ticket.ticketTag,
      }));
      setTickets(prevTickets => [...prevTickets, ...ticketsList]);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } else {
      console.error("Error al obtener tickets:", response.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, []);

  const handlePress = (ticket: any) => {
    const { date, time } = formatDate(ticket.createdAt);
    router.push(
      `/chat?id=${encodeURIComponent(ticket.id)}&title=${encodeURIComponent(ticket.title)}&description=${encodeURIComponent(ticket.description)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(ticket.type)}&ticketTag=${encodeURIComponent(ticket.ticketTag?.name || '')}`
    );
  };

  const handleScroll = ({ nativeEvent }: any) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;

    if (isCloseToBottom && currentPage < totalPages && !isLoading) {
      fetchTickets(currentPage + 1);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <TopBarBack title="Historial" />

      <View className="flex-1 p-4">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} 
        >
          {tickets.length === 0 && !isLoading && (
            <View className="py-8">
              <Text className="text-center text-lg text-primary">No hay tickets creados.</Text>
            </View>
          )}

          {tickets.map(ticket => {
            const { date, time } = formatDate(ticket.createdAt);
            return (
              <TouchableOpacity
                key={ticket.id}
                className="bg-terciary p-4 mb-4 rounded-xl mx-1 shadow flex-row items-start"
                onPress={() => handlePress(ticket)}
              >
                <View className="bg-primary rounded-full p-2 mr-2 mt-4">
                  <MaterialCommunityIcons name="headset" size={36} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    className="text-lg font-bold text-primary"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {ticket.title || "Título no disponible"}
                  </Text>
                  <Text className="text-xs text-gray-500 my-0.5">Fecha: {date} Hora: {time}</Text>
                  <Text className="text-sm text-cancel">{getTypeLabel(ticket.type)}</Text>
                  {ticket.ticketTag && (
                    <Text className="text-sm text-cancel">Tipo: {ticket.ticketTag.name}</Text>
                  )}
                  <Text className="text-base text-secondary font-extrabold">
                    {getStatusLabel(ticket.status)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

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

export default SupportHistoryPage;


