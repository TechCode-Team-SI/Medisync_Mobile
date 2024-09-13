import React from 'react';
import { View, Text } from 'react-native';
import styles from './stylesHome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const InfoHome: React.FC = () => {
  return (
    <View className={styles.containerInfo}>

        <Text className={styles.titleInfo}>Conéctate con nosotros</Text>

        <View className={styles.containerInfo2}>
            
            <View className={styles.containerInfo3}>
                <AntDesign name="mail" size={22} color="#539091" />
            </View>

            <View className={styles.containerInfo3}>
                <AntDesign name="phone" size={22} color="#539091" />
            </View>

            <View className={styles.containerInfo3}>
                <MaterialCommunityIcons name="deskphone" size={24} color="#539091" />
            </View>

            <View className={styles.containerInfo3}>
                <Ionicons name="location-outline" size={24} color="#539091" />
            </View>

            <View className={styles.containerInfo3}>
                <AntDesign name="instagram" size={22} color="#539091" />
            </View>

        </View>

    </View>
  );
};

export default InfoHome;