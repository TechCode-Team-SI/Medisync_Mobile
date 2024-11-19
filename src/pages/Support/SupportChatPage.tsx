import TopBarBack from "@/src/components/Navigation/TopBarBack";
import styles from "@/src/components/SupportComponents/stylesChat";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CommentsTickets from "@/src/components/SupportComponents/CommentsTickets";
import InfoTicket from "@/src/components/SupportComponents/InfoTickets";
import { useWebScoket } from "@/src/hooks/socket/useSocket";
import useFetchUser from "@/src/hooks/user/useFetchUser";
import { getCommentsForTicket } from "@/src/services/tickets/ticketsServices";
import { handleSendComment } from "@/src/services/tickets/ticketsUtils";
import { SocketEnum, TicketChatMessage } from "@/src/types/types";
import { useLocalSearchParams } from "expo-router";

interface TicketComment {
  id: string;
  comment: string;
  createdBy: {
    fullName: string;
  };
  createdAt: string;
}

const SupportChatPage: React.FC = () => {
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [inputTex, setInputTex] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const { user } = useFetchUser();
  const { id } = useLocalSearchParams();
  const { socket } = useWebScoket();

  const onSendComment = async () => {
    if (!inputTex.trim()) {
      setModalMessage("El comentario no puede estar vacío.");
      setModalVisible(true);
      return;
    }

    const newComment: TicketComment = {
      id: Math.random().toString(),
      comment: inputTex,
      createdBy: { fullName: user.fullName },
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setInputTex("");

    try {
      const comment = await handleSendComment(
        id as string,
        inputTex,
        setModalMessage,
        setModalVisible,
        setInputTex
      );
      socket?.emit(SocketEnum.TICKET_CHANNEL, comment?.data);
    } catch {
      setModalMessage("Error al enviar el comentario.");
      setModalVisible(true);
      setComments((prev) =>
        prev.filter((comment) => comment.id !== newComment.id)
      );
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit(SocketEnum.JOIN_ROOM, id);

      socket.on(SocketEnum.TICKET_CHANNEL, (data: TicketChatMessage) => {
        const newComment: TicketComment = {
          id: data.id,
          comment: data.message,
          createdBy: {
            fullName: data.sender.fullName,
          },
          createdAt: data.createdAt,
        };
        setComments((prevComments) => [...prevComments, newComment]);
      });
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getCommentsForTicket(id as string);
        if (result.success && Array.isArray(result.data.data)) {
          setComments(result.data.data);
        } else {
          setModalMessage(result.message || "Error al obtener comentarios.");
          setModalVisible(true);
        }
      } catch {
        setModalMessage("Error al obtener comentarios.");
        setModalVisible(true);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <View className={styles.container}>
      <TopBarBack title="Agente de Soporte" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <InfoTicket />

        <TouchableOpacity
          className={styles.container5}
          onPress={() => alert("")}
        >
          <Entypo name="chevron-down" size={25} color="#539091" />
          <Text className={styles.title3}>Respuestas</Text>
        </TouchableOpacity>

        <CommentsTickets comments={comments} />

        <View className={styles.containerInput}>
          <TextInput
            className={styles.input}
            placeholder="Escribe tu mensaje"
            placeholderTextColor="#539091"
            value={inputTex}
            onChangeText={setInputTex}
          />
          <TouchableOpacity
            onPress={onSendComment}
            className={styles.iconButton}
          >
            <Ionicons name="send-sharp" size={28} color="#539091" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SupportChatPage;
