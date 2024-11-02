import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView  } from 'react-native';
import styles from '@/src/components/Styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import Fontisto from '@expo/vector-icons/Fontisto';
import { router } from "expo-router";
import SearchBar from "@/src/components/SearchBar";
import { getspecialites } from "@/src/services/appointments/specialtiesServices";
import { getDr } from "@/src/services/appointments/doctorsServices";
import { Specialties } from "@/src/services/appointments/specialtiesServices";


const SearchPage: React.FC = () => {

    const handleSelect = async(specialtyid: string[], specialtyName: string) => {
      console.log('Id Especialidad:', specialtyid);
      const result = await getDr(specialtyid); 
      if (result.success && Array.isArray(result.data)) { 
        router.push({
          pathname: '/searchdr',
          params: { doctors: JSON.stringify(result.data),
            specialtyName: specialtyName,
           }, // Pasamos los doctores como un string JSON
        }); 
      } else { 
        console.log('Error inesperado:'); 
      } 
     
    };

    const [specialties, setSpecialties]  = useState<Specialties[]>([]);
    const [searchText, setSearchText] = useState(''); // Estado para la barra de búsqueda
    
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

     // Filtrar especialidades según el texto ingresado
     const filteredSpecialties = specialties.filter(specialty => 
     specialty.name.toLowerCase().includes(searchText.toLowerCase())
  );

    return (
        <View className={styles.container1}>

         <ButtonBack/>
         <Text className={styles.title1}> Servicios</Text>

          <View className={styles.containerBg1}>
              
            <View className={styles.containerSearch}>
            <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 3 }}>
            <View className={styles.containerGrid}>
            {filteredSpecialties.map((specialty) => (

            <TouchableOpacity
            key={specialty.id}
                className={styles.button}
                onPress={() => handleSelect([specialty.id], specialty.name )}>
                  <Fontisto name="doctor" size={24} color="#539091" />
                <Text className={styles.buttonText}>{specialty.name}</Text>
              </TouchableOpacity>
))}

            </View>
            </ScrollView>
          </View>
          
          
        </View>
      );
};

export default SearchPage;