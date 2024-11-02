import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesChat';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TopBarSupport from '@/src/components/SupportComponents/TopBarSupport';
import Ionicons from '@expo/vector-icons/Ionicons';
import AlertModal from '@/src/components/Modal/AlertModal';

import useFetchUser from '@/src/services/user/useFetchUser';
import { useLocalSearchParams } from "expo-router";
import { handleSendComment } from '@/src/services/tickets/ticketsUtils';

const SupportChatPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [inputTex, setInputTex] = useState('');
  const { user, selectedImage } = useFetchUser();
  const { id, title, description } = useLocalSearchParams();

  if (typeof id !== 'string') {
    console.error("El id no es un string válido:", id);
    setModalMessage("ID de ticket no válido.");
    setModalVisible(true);
    return null; 
  }

  const onSendComment = () => {
    handleSendComment(id, inputTex, setModalMessage, setModalVisible, setInputTex);
  };

  return (
    <View className={styles.container}>
      <TopBarSupport title="Agente de Soporte" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View className={styles.container1}>
            <View className={styles.containerRow}>
              <View className={styles.containerImage}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} className={styles.image} />
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

          <TouchableOpacity className={styles.container5} onPress={() => alert("")}>
            <Entypo name="chevron-down" size={25} color="#539091" />
            <Text className={styles.title3}>Respuestas</Text>
          </TouchableOpacity>

          <View className={styles.container2}>

            <View className={styles.containerInput}>
              <TextInput
                className={styles.input}
                placeholder="Escribe tu mensaje"
                placeholderTextColor="#539091"
                value={inputTex}
                onChangeText={setInputTex}
              />
              <TouchableOpacity onPress={onSendComment} className={styles.iconButton}>
                <Ionicons name="send-sharp" size={28} color="#539091" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="ATENCIÓN"
        message={modalMessage}
      />
    </View>
  );
};

export default SupportChatPage;




