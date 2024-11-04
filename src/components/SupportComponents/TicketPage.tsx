import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import styles from "@/src/components/SupportComponents/stylesSupport";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TopBarBack from "../Navigation/TopBarBack";
import { createTicket } from "@/src/services/tickets/ticketsServices";
import { getToken } from "@/src/services/auth/sessionServices"; 
import AlertModal from '@/src/components/Modal/AlertModal';

interface TicketPageProps {
  title: string;
  icon: string;
  descriptionText: string;
  type: "suggestion" | "complaint";  
}

const TicketPage: React.FC<TicketPageProps> = ({ title, icon, descriptionText, type }) => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCreateTicket = async () => {
    if (!ticketTitle || !ticketDescription) {
      setModalMessage("Por favor, complete todos los campos.");
      setModalVisible(true);
      return;
    }

    const token = await getToken();

    if (!token) {
      setModalMessage("No se pudo obtener la sesión. Inicie sesión nuevamente.");
      setModalVisible(true);
      console.log("Token no encontrado");
      return;
    }

    const result = await createTicket(token, {
      title: ticketTitle,
      description: ticketDescription,
      type,
    });

    console.log("Resultado de crear ticket:", result);

    if (result.success) {
      setModalMessage(`${type === "suggestion" ? "Sugerencia" : "Reclamo"} creado exitosamente.`);
      setModalVisible(true);
      setTicketTitle("");
      setTicketDescription("");
    } else {
      setModalMessage(result.message || "Error al crear el ticket." );
      setModalVisible(true);
    }
  };

  return (
    <View className={styles.container}>
      <TopBarBack title={title} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={styles.container3}>
          <MaterialCommunityIcons name="headset" size={100} color="#539091"/>
          <Text className={styles.title1}>{descriptionText}</Text>
        </View>

        <View className={styles.container4}>
          <Text className={styles.text2}>Título</Text>
          <View className={styles.containerInput}>
            <TextInput
              className={styles.input}
              placeholder=""
              placeholderTextColor="#539091"
              value={ticketTitle}
              onChangeText={setTicketTitle}
            />
          </View>

          <Text className={styles.text3}>Descripción</Text>
          <View className={styles.containerInput2}>
            <TextInput
              className={styles.input}
              placeholder=""
              placeholderTextColor="#539091"
              multiline={true}
              textAlignVertical="top"
              value={ticketDescription}
              onChangeText={setTicketDescription}
            />
          </View>

          <TouchableOpacity className={styles.button1} onPress={handleCreateTicket}>
            <Text className={styles.buttonText1}>Crear ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="ATENCIÓN"
        message={modalMessage}
      />
    </View>
  );
};

export default TicketPage;
