
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "@/src/components/NosotrosComponents/stylesNosotros";
import { Entypo } from '@expo/vector-icons'; 

const NosotrosPage: React.FC = () => {

    const handleBack = () => {
      };
    const handleContact = () => {
    };

  return (
    <View className={styles.container}>

      <TouchableOpacity className={styles.backButton} onPress={handleBack}>
        <Entypo name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <Text className={styles.title1}>MediSync</Text>

      <View className={styles.containerNosotros}>

        <Text className={styles.title2}>MISIÓN</Text>
        <Text className={styles.description}>
          Proporcionar atención médica integral y de calidad, centrada en el bienestar y la salud preventiva de nuestros pacientes, utilizando tecnología avanzada y un enfoque humano y empático en cada consulta.
        </Text>

        <Text className={styles.title2}>VISIÓN</Text>
        <Text className={styles.description}>
          Nuestra visión es ser líderes reconocidos en la prestación de servicios de salud, destacándonos por nuestra excelencia médica, innovación en tratamientos, y el compromiso constante con la mejora continua y la satisfacción del paciente.
        </Text>
        
        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleContact}
          >
            <Text className={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

export default NosotrosPage;
