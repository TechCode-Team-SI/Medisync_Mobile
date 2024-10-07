import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesChat';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TopBarSupport from '@/src/components/SupportComponents/TopBarSupport';
import Ionicons from '@expo/vector-icons/Ionicons';

const SupportChatPage: React.FC = () => {
  const [inputTex, setInputTex] = useState('');

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={styles.container}>
          <TopBarSupport title="Agente de Soporte" />

          <View className={styles.container1}>
            <View className={styles.containerIcon}>
              <FontAwesome name="user-circle" size={33} color="#539091" />
              <Text className={styles.title}>Nombre de Usuario</Text>
            </View>

            <View className={styles.containerInfo}>
              <Text className={styles.title2}>Título</Text>
              <Text className={styles.text}>Información del ticket.</Text>
            </View>
          </View>

          <TouchableOpacity className={styles.container5} onPress={() => alert("")}>
            <Entypo name="chevron-down" size={25} color="#539091" />
            <Text className={styles.title3}>Respuestas</Text>
          </TouchableOpacity>

          <View className={styles.container3}>
            <View className={styles.container4}>
              <Text className={styles.title4}>Agente de Soporte</Text>
              <FontAwesome5 name="info-circle" size={30} color="#539091" />
              <View className={styles.containerInfo2}>
                <View className={styles.containerDate}>
                  <Text className={styles.textDate}>dd/mm/aaaa</Text>
                  <Text className={styles.textHour}>hh:hh am</Text>
                </View>
                <View className={styles.containerMessage}>
                  <Text className={styles.textMessage}>Mensaje</Text>
                </View>
              </View>
            </View>

            <View className={styles.container4}>
              <Text className={styles.title4}>Nombre de usuario</Text>
              <FontAwesome name="user-circle" size={30} color="#539091" />
              <View className={styles.containerInfo2}>
                <View className={styles.containerDate}>
                  <Text className={styles.textDate}>dd/mm/aaaa</Text>
                  <Text className={styles.textHour}>hh:hh am</Text>
                </View>
                <View className={styles.containerMessage}>
                  <Text className={styles.textMessage}>Mensaje</Text>
                </View>
              </View>
            </View>
          </View>

          <View className={styles.container2}>
            <View className={styles.containerInput}>
              <TextInput
                className={styles.input}
                placeholder="Escribe tu mensaje"
                placeholderTextColor="#539091"
                value={inputTex}
                onChangeText={setInputTex}
              />
              <TouchableOpacity onPress={() => alert("")} className={styles.iconButton}>
                <Ionicons name="send-sharp" size={28} color="#539091" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SupportChatPage;
