import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/src/components/Styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import Fontisto from '@expo/vector-icons/Fontisto';
import { router } from "expo-router";

import { getspecialites } from "@/src/services/auth/authSpecialties";
import { getDr } from "@/src/services/auth/authDr";
import { Specialties } from "@/src/services/auth/authSpecialties";



const SearchPage: React.FC = () => {

    const handleSelect = async(specialtyid: string[]) => {
      console.log('Id Especialidad:', specialtyid);
      const result = await getDr(specialtyid); 
      if (result.success && Array.isArray(result.data)) { 
        router.push({
          pathname: '/searchdr',
          params: { doctors: JSON.stringify(result.data) }, // Pasamos los doctores como un string JSON
        }); 
      } else { 
        console.log('Error inesperado:'); 
      } 
     
    };

    const [specialties, setSpecialties]  = useState<Specialties[]>([]);

    useEffect(() => {
      const fetchUser= async () => {
        const result = await getspecialites();
        if (result.success && Array.isArray(result.data)) {
          setSpecialties(result.data);
        } else {
          console.log('Error al obtener especialidades o la data no es un array');
        }
      };
      fetchUser();
    }, []);

    return (
        <View className={styles.container1}>

         <ButtonBack/>
         <Text className={styles.title1}> Servicios</Text>

          <View className={styles.containerBg1}>

            <Text className={styles.title2}> Especialidad</Text>
              
            <View className={styles.containerGrid}>
            {specialties.map((specialty) => (

            <TouchableOpacity
            key={specialty.id}
                className={styles.button}
                onPress={() => handleSelect([specialty.id] )}>
                  <Fontisto name="doctor" size={24} color="#539091" />
                <Text className={styles.buttonText}>{specialty.name}</Text>
              </TouchableOpacity>
))}

            </View>

          </View>
          
          
        </View>
      );
};

export default SearchPage;