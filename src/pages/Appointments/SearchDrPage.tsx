import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView   } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styles from '@/src/components/Styles/styleSearch';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router'; 
import { Dr } from "@/src/services/appointments/doctorsServices";
import SearchBar from "@/src/components/SearchBar";
import styles2 from "@/src/components/ProfileComponents/stylesProfile";

const SearchDrPage: React.FC = () => {
  const router = useRouter();
  const { doctors, specialtyName } = useLocalSearchParams();

  const [drs, setdrs]  = useState<Dr[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (doctors) {
      console.log('Doctores recibidos:', doctors);
      setdrs(JSON.parse(doctors as string)); // Parsear el string JSON a un array de objetos
    }
  }, [doctors]);

  const filteredDrs = drs.filter(dr => 
    dr.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = () => {
    router.push('/createappointment');
  };

  return (
    <View className={styles.container1}>
      <ButtonBack/>
      <Text className={styles.title1}>{specialtyName}</Text>

      <View className={styles.containerBg2}>
        <Text className={styles.title2}>Especialistas Disponibles</Text>
       
        <View className={styles2.containerTop}>
        <SearchBar
            value={searchText}
            onChangeText={setSearchText}
          />
          </View>
        
        <ScrollView contentContainerStyle={{ paddingVertical: 3 }}>
        <View className={styles.container}>
        {filteredDrs.map((dr) => (
          <TouchableOpacity
          key={dr.id}
            className={styles.button2}
            onPress={handleSelect}>
            <FontAwesome5 name="user-alt" size={26} color="#539091"/>
            <Text className={styles.buttonText2}>Dr. {dr.fullName || 'Nombre no disponible'}</Text>
          </TouchableOpacity>
           ))}
        </View>
        </ScrollView>
      </View>

    </View>
  );
};

export default SearchDrPage;
