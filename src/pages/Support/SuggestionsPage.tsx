import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import styles from "@/src/components/SupportComponents/stylesSupport";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TopBarSupport from '@/src/components/SupportComponents/TopBarSupport';

const SuggestionPage: React.FC = () => {

  return (
    <View className={styles.container}>
      <TopBarSupport title="Sugerencias" />

          <View className={styles.container3}>
            <MaterialCommunityIcons name="headset" size={100} color="#539091" />

            <Text className={styles.title1}>¿Tienes alguna sugerencia? Compártela con nosotros.</Text>

          </View>

          <View className={styles.container4}>

            <Text className={styles.text2}>Título</Text>
                <View className={styles.containerInput}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                />
                </View>

            <Text className={styles.text3}>Descripción</Text>
                <View className={styles.containerInput2}>
                    <TextInput
                    className={styles.input}
                    placeholder=""
                    placeholderTextColor="#539091"
                />
                </View>
                
                <TouchableOpacity
                  className={styles.button1}
                  >
                  <Text className={styles.buttonText1}>Crear</Text>
                </TouchableOpacity>
          </View>




    </View>
  );
};

export default SuggestionPage;