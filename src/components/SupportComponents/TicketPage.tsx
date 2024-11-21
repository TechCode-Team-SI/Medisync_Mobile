import React, { useState } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import styles from "@/src/components/SupportComponents/stylesSupport";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TopBarBack from "../Navigation/TopBarBack";
import { createTicket } from "@/src/services/tickets/ticketsServices";
import { getToken } from "@/src/services/auth/sessionServices"; 
import AlertModal from '@/src/components/Modal/AlertModal';
import CustomButton from "../ui/CustomButton";
import DataPicker from "@/src/components/Forms/DataPicker"; 
import useTicketTags from "@/src/hooks/support/useTicketTags"; 

interface TicketPageProps {
  title: string;
  icon: string;
  descriptionText: string;
  type: "suggestion" | "complaint";  
}

const TicketPage: React.FC<TicketPageProps> = ({ title, icon, descriptionText, type }) => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketTag, setTicketTag] = useState<string | null>(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [pickerKey, setPickerKey] = useState(0); 

  const { ticketTags, error } = useTicketTags(type); 

  const handleCreateTicket = async () => {
    if (!ticketTitle || !ticketDescription || (type === "complaint" && !ticketTag)) {
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

    console.log("ID del ticketTag seleccionado:", ticketTag);

    const ticketData = {
      title: ticketTitle,
      description: ticketDescription,
      type,
      ticketTag: { id: ticketTag || "" },
    };

    const result = await createTicket(token, ticketData);
    console.log("Resultado de crear ticket:", result);

    if (result.success) {
      setModalMessage(`${type === "suggestion" ? "Sugerencia" : "Reclamo"} creado exitosamente.`);
      setModalVisible(true);
      setTicketTitle("");
      setTicketDescription("");
      setTicketTag(null); 
      setPickerKey(prevKey => prevKey + 1); 
    } else {
      setModalMessage(result.message || "Error al crear el ticket.");
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

          {type === "complaint" && (
            <View>
              <Text className={styles.text3}>Seleccione un tipo de reclamo</Text>
              <View className="flex-row bg-bgInput w-full pl-2 h-14 items-center rounded-xl">
                <DataPicker
                  key={pickerKey} 
                  options={ticketTags.length > 0 ? ticketTags.map(tag => ({ label: tag.name, value: tag.id })) : []}
                  placeholder="Seleccionar"
                  onSelect={(id) => {
                    console.log("ID seleccionado:", id);
                    setTicketTag(id);
                  }}
                  modalTitle="Seleccione un tipo de reclamo"
                  initialValue={ticketTag || ""} 
                />
              </View>
              {error && <Text className={styles.text}>{error}</Text>} 
            </View>
          )}

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

          <CustomButton onPress={handleCreateTicket} title="Crear Ticket" />
          
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





