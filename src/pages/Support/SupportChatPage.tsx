import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import styles from "@/src/components/SupportComponents/stylesChat";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TopBarBack from "@/src/components/Navigation/TopBarBack";
import Ionicons from "@expo/vector-icons/Ionicons";

import useFetchUser from "@/src/hooks/user/useFetchUser";
import { useLocalSearchParams } from "expo-router";
import { handleSendComment } from "@/src/services/tickets/ticketsUtils";
import { getCommentsForTicket } from "@/src/services/tickets/ticketsServices";
import { useWebScoket } from "@/src/hooks/socket/useSocket";
import { SocketEnum, TicketChatMessage } from "@/src/types/types";

interface TicketComment {
  id: string;
  comment: string;
  createdBy: {
    fullName: string;
  };
  createdAt: string;
}

const SupportChatPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [inputTex, setInputTex] = useState("");
  const { socket } = useWebScoket();

  const [comments, setComments] = useState<TicketComment[]>([]);
  const { user, selectedImage } = useFetchUser();
  const { id, title, description } = useLocalSearchParams();
  const onSendComment = async () => {
    if (typeof id === "string") {
      const newComment: TicketComment = {
        id: Math.random().toString(),
        comment: inputTex,
        createdBy: {
          fullName: user.fullName,
        },
        createdAt: new Date().toISOString(),
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setInputTex("");

      try {
        const comment = await handleSendComment(
          id,
          inputTex,
          setModalMessage,
          setModalVisible,
          setInputTex
        );
        if (comment?.data) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== newComment.id)
          );
          setComments((prevComments) => [newComment, ...prevComments]);
          socket?.emit(SocketEnum.TICKET_CHANNEL, comment.data);
        }
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
        setModalMessage("Error al enviar el comentario.");
        setModalVisible(true);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== newComment.id)
        );
      }
    } else {
      setModalMessage("ID de ticket no válido.");
      setModalVisible(true);
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
      if (typeof id === "string") {
        const result = await getCommentsForTicket(id);
        console.log("Resultado de obtener comentarios:", result);
        if (result.success) {
          if (Array.isArray(result.data.data)) {
            setComments(result.data.data);
          } else {
            setModalMessage("Error: Los comentarios no son un array.");
            setModalVisible(true);
          }
        } else {
          setModalMessage(result.message ?? "Error al obtener comentarios.");
          setModalVisible(true);
        }
      } else {
        setModalMessage("ID de ticket no válido.");
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
        <View className={styles.container1}>
          <View className={styles.containerRow}>
            <View className={styles.containerImage}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  className={styles.image}
                />
              ) : (
                <FontAwesome name="user-circle" size={40} color="#539091" />
              )}
            </View>

            <Text className={styles.title}>{user.fullName}</Text>
          </View>

          <View className={styles.containerInfo}>
            <Text className={styles.title2}>{title}</Text>
            <Text className={styles.text}>{description}</Text>
          </View>
        </View>

        <TouchableOpacity
          className={styles.container5}
          onPress={() => alert("")}
        >
          <Entypo name="chevron-down" size={25} color="#539091" />
          <Text className={styles.title3}>Respuestas</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className={styles.container2}>
            {comments.map((comment) => (
              <View key={comment.id} className={styles.commentContainer}>
                <Text className={styles.commentUser}>
                  {comment.createdBy.fullName}
                </Text>
                <Text className={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleString()}
                </Text>
                <Text className={styles.commentText}>{comment.comment}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
