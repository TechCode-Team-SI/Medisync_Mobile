import React from 'react';
import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '@/src/components/SupportComponents/stylesChat';
import { getTypeLabel } from '@/src/utils/support/changeLabel';
import useFetchUser from '@/src/hooks/user/useFetchUser';
import { useLocalSearchParams } from "expo-router";

const InfoTicket: React.FC = () => {
  const { user, selectedImage } = useFetchUser();
  const { title, description, date, time, ticketTag, type } = useLocalSearchParams();

  const typeValue = typeof type === 'string' ? type : Array.isArray(type) ? type[0] : "Tipo desconocido";

  return (
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
        
        <Text className="text-xs text-gray-500 my-0.5">
          {date}      {time}
        </Text>

        <Text className="text-sm text-gray-500 my-0.5">
          {getTypeLabel(typeValue)}
          {ticketTag && ` de tipo: ${ticketTag}`}
        </Text>
        <Text className={styles.text}>{description}</Text>
      </View>
    </View>
  );
};

export default InfoTicket;

