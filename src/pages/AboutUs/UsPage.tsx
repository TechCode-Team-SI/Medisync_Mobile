import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/AboutUsComponents/stylesUs";
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { getMedicalCenters } from "@/src/services/medicalcenters/infoServices"

const UsPage: React.FC = () => {

  const [medicalCenters, setMedicalCenters] = useState<{
    name:string,
    mission:string, 
    vision:string, 
                    }>({ vision: '', 
                         mission: "", 
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

    const navigation = useNavigation();  

    const handleBack = () => {
        navigation.goBack();  
    };

  return (
    <View className={styles.container}>

      <TouchableOpacity className={styles.backButton} onPress={handleBack}>
        <Entypo name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <Text className={styles.title1}>{medicalCenters.name}</Text>

      <View className={styles.containerBg}>

        <Text className={styles.title2}>MISIÓN</Text>
        <Text className={styles.description}>
        {medicalCenters.mission}
        </Text>

        <Text className={styles.title2}>VISIÓN</Text>
        <Text className={styles.description}>
        {medicalCenters.vision}
        </Text>
        

      </View>

    </View>
  );
};

export default UsPage;