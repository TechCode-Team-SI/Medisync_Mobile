import React from 'react';
import { View, Text } from 'react-native';
import styles from "@/src/components/AboutUsComponents/stylesUs";
import ButtonBack from '@/src/components/Navigation/ButtonBack';
import useMedicalCenters from '@/src/hooks/medicalcenters/useMedicalCenters';

const UsPage: React.FC = () => {
  const { medicalCenters, error } = useMedicalCenters();

  return (
    <View className={styles.container}>
      <ButtonBack buttonColor="#5DA9A3" />

      {error ? (
        <Text className={styles.title2}>{error}</Text>
      ) : (
        <>
        
          <Text className={styles.title1}>{medicalCenters.name}</Text>
          <View className={styles.containerBg}>

            <Text className={styles.title2}>¿Quiénes somos?</Text>
            <Text className={styles.description}>
              {medicalCenters.description}
            </Text>

            <Text className={styles.title2}>Misión</Text>
            <Text className={styles.description}>
              {medicalCenters.mission}
            </Text>

            <Text className={styles.title2}>Visión</Text>
            <Text className={styles.description}>
              {medicalCenters.vision}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UsPage;
