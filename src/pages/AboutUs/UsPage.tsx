import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from "@/src/components/AboutUsComponents/stylesUs";
import ButtonBack from '@/src/components/Navigation/ButtonBack';
import useMedicalCenters from '@/src/hooks/medicalcenters/useMedicalCenters';

const UsPage: React.FC = () => {
  const { medicalCenters, error } = useMedicalCenters();
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);

  return (
    <View className={styles.container}>
      <ButtonBack buttonColor="#5DA9A3" />

      {error ? (
        <Text className={styles.title2}>{error}</Text>
      ) : (
        <>
          <Text className={styles.title1}>{medicalCenters.name}</Text>
          <View className={styles.containerBg}>
            <ScrollView contentContainerStyle={{ paddingBottom: 10 } } showsVerticalScrollIndicator={false}>
              <Text className={styles.title2}>¿Quiénes somos?</Text>
              <Text className={styles.description}>
                {medicalCenters.description}
              </Text>

              <TouchableOpacity onPress={() => setShowMission(!showMission)} className={styles.dropdown}>
                <View className="flex-row items-center ">
                  <Text className={styles.title2}>
                    Misión 
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={28} color="#539091" />
                </View>
              </TouchableOpacity>
              {showMission && (
                <Text className={styles.description}>
                  {medicalCenters.mission}
                </Text>
              )}

              <TouchableOpacity onPress={() => setShowVision(!showVision)} className={styles.dropdown}>
                <View className="flex-row items-center ">
                  <Text className={styles.title2}>
                    Visión
                  </Text>
                  <View className='pl-1'><MaterialIcons name="keyboard-arrow-down" size={28} color="#539091" /></View>
                </View>
              </TouchableOpacity>
              {showVision && (
                <Text className={styles.description}>
                  {medicalCenters.vision}
                </Text>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default UsPage;
