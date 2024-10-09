import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './stylesHome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getMedicalCenters } from "@/src/services/medicalcenters/infoServices"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

const InfoHome: React.FC = () => {
    const [medicalCenters, setMedicalCenters] = useState<{
        name:string,
        state:string, 
        municipality:string, 
        parish:string, 
        localPhone: string, 
        address: string, 
        mobilePhone: string }>({ localPhone: '', 
                                 address: "", 
                                 state:"", 
                                 mobilePhone:"",
                                 municipality:"",
                                 parish:"",
                                 name:""});

    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalCenters = async () => {
      const result = await getMedicalCenters();
      if (result.success) {
        setMedicalCenters(result.data);
      } else {
        setError(result.message);
      }
    };

    fetchMedicalCenters();
  }, []);

  return (
<View className={styles.containerInfo}>

<Text className={styles.titleInfo}>Conéctate con nosotros</Text>

<View className={styles.containerInfo2}>

    <TouchableOpacity className={styles.containerInfo3}>
        <FontAwesome5 name="clinic-medical" size={22} color="#539091" />
        <Text className={styles.textInfo}>{medicalCenters.name}</Text>

    </TouchableOpacity>

    <TouchableOpacity className={styles.containerInfo3}>
        <AntDesign name="phone" size={22} color="#539091" />
        <Text className={styles.textInfo}>{medicalCenters.mobilePhone}</Text>
    </TouchableOpacity>

    <TouchableOpacity className={styles.containerInfo3}>
        <MaterialCommunityIcons name="deskphone" size={24} color="#539091" />
        <Text className={styles.textInfo}>{medicalCenters.localPhone}</Text>
    </TouchableOpacity>

    <TouchableOpacity className={styles.containerInfo3}>
        <Entypo name="location" size={22} color="#539091" />
        <Text className={styles.textInfo}>{medicalCenters.state}, {medicalCenters.municipality}, {medicalCenters.parish}</Text>
    </TouchableOpacity>

    <TouchableOpacity className={styles.containerInfo3}>
        <Ionicons name="location-outline" size={24} color="#539091" />
        <Text className={styles.textInfo}>{medicalCenters.address}</Text>
    </TouchableOpacity>

</View>

</View>
  );
};

export default InfoHome;
