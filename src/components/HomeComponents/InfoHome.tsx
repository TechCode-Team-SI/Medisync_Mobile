import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './stylesHome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const InfoHome: React.FC = () => {
  return (
    <View className={styles.containerInfo}>

        <Text className={styles.titleInfo}>Conéctate con nosotros</Text>

        <View className={styles.containerInfo2}>
    
            <TouchableOpacity className={styles.containerInfo3}>
                <AntDesign name="mail" size={22} color="#539091" />
                <Text className={styles.textInfo}> email@gmail.com</Text>

            </TouchableOpacity>

            <TouchableOpacity className={styles.containerInfo3}>
                <AntDesign name="phone" size={22} color="#539091" />
                <Text className={styles.textInfo}>xxxx-xxxxxxx</Text>
            </TouchableOpacity>

            <TouchableOpacity className={styles.containerInfo3}>
                <MaterialCommunityIcons name="deskphone" size={24} color="#539091" />
                <Text className={styles.textInfo}>xxxx-xxxxxxx</Text>
            </TouchableOpacity>

            <TouchableOpacity className={styles.containerInfo3}>
                <Ionicons name="location-outline" size={24} color="#539091" />
                <Text className={styles.textInfo}>Av. Florencio Jiménez</Text>
            </TouchableOpacity>

            <TouchableOpacity className={styles.containerInfo3}>
                <AntDesign name="instagram" size={22} color="#539091" />
                <Text className={styles.textInfo}>@tucentromedico</Text>
            </TouchableOpacity>

        </View>

    </View>
  );
};

export default InfoHome;