import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity,ScrollView } from 'react-native';
import styles from "@/src/components/styled-Cartelera/styleHilo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router'; 

const Hilo: React.FC = () => {


  const [inputTex, setInputTex] = useState('');

  return (
    <View className={styles.container}>
           <View className={styles.container6}>
          <TouchableOpacity onPress={() => alert("")} className="p-3 mt-5">
                  {<AntDesign name="arrowleft" size={30} color="#68C3B7" className="p-2"/>}
         </TouchableOpacity>
         <Text  className={styles.title3}> Agente de Soporte
         </Text>
         </View>
        <View className={styles.container7}>
        <FontAwesome name="user-md" size={70} color="#68C3B7" className="p-4"/>
            <Text className={styles.title1}>
                Number de User
            </Text>
            <Text className={styles.title2}>
                Title
            </Text>
            <View className={styles.container13}>
            <Text className={styles.title8}>
                Information
            </Text>
            </View>
        </View>
        <View className={styles.container8}>
          <TouchableOpacity onPress={() => alert("")} className="p-2">
                  {<Entypo name="chevron-down" size={25} color="#68C3B7" />}
         </TouchableOpacity>
              <Text className={styles.title4}>
                Respuesta
               </Text>
        </View>
        <View className={styles.container10}>
             <Text className={styles.title6}>
                 Agente de Soporte
               </Text>
            {<FontAwesome name="user-md" size={35} color="#68C3B7"/>}
          <View className={styles.container9}>
              <Text className={styles.title5}>
                 dd/mm/aaaa
               </Text>
               <Text className={styles.title9}>
                 hh:hh am
               </Text>
               <View className={styles.container15}>
               <Text className={styles.title10}>
                 information
               </Text>
               </View>
          </View>

             <Text className={styles.title6}>
             Nombre de Usuario
               </Text>
           {<FontAwesome name="user-circle" size={33} color="#68C3B7"/>}
          <View className={styles.container9}>
              <Text className={styles.title5}>
              dd/mm/aaaa
               </Text>
               <Text className={styles.title9}>
                 hh:hh am
               </Text>
               <View className={styles.container15}>
               <Text className={styles.title10}>
                 information
               </Text>
               </View>
          </View>
             
             <Text className={styles.title6}>
               Agente de Soporte
               </Text>
            {<FontAwesome name="user-md" size={35} color="#68C3B7" />}
          <View className={styles.container9}>
              <Text className={styles.title5}>
              dd/mm/aaaa
               </Text>
               <Text className={styles.title9}>
                 hh:hh am
               </Text>
               <View className={styles.container15}>
               <Text className={styles.title10}>
                 information
               </Text>
               </View>
          </View>
             
             <Text className={styles.title6}>
             Nombre de Usuario
               </Text>
            {<FontAwesome name="user-circle" size={33} color="#68C3B7"/>}
          <View className={styles.container9}>
              <Text className={styles.title5}>
              dd/mm/aaaa
               </Text>
               <Text className={styles.title9}>
                 hh:hh am
               </Text>
               <View className={styles.container15}>
               <Text className={styles.title10}>
                 information
               </Text>
               </View>
          </View>  
        </View>

        <View className={styles.container11}>
        <TouchableOpacity onPress={() => alert("")} className={styles.container12}>
        <Octicons name="paper-airplane" size={26} color="#68C3B7" />
        </TouchableOpacity>
        <TextInput
          className={styles.input}
          placeholder="Escribe tu Mensaje"
          placeholderTextColor="#539091"
          value={inputTex}
          onChangeText={setInputTex}
          />
        </View>

    </View>
  );
};

export default Hilo;
