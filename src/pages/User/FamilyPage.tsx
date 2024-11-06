import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AddButton from "@/src/components/AddButton";
import SearchBar from "@/src/components/SearchBar";
import { router } from "expo-router";
import { getUserPatients } from '@/src/services/familyGroup/familyServices';
import Loader from "@/src/components/ui/Loader"; 

const FamilyPage: React.FC = () => {
  const [patients, setPatients] = useState<{ fullName: string; id: string; dni: string; birthday: string; gender: string; familyRelationship: string }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); 

  const handleSelect = (patient: any) => {
    router.push(`/userfamily?fullName=${encodeURIComponent(patient.fullName)}&dni=${encodeURIComponent(patient.dni)}&birthday=${encodeURIComponent(patient.birthday)}&gender=${encodeURIComponent(patient.gender)}&familyRelationship=${encodeURIComponent(patient.familyRelationship)}`);
  };

  const handleAdd = () => {
    router.push("/addfamily");
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const fetchPatients = async () => {
    setLoading(true); 
    const response = await getUserPatients();
    if (response.success && response.data && Array.isArray(response.data.data)) {
      const patientsList = response.data.data.map((patient: any) => ({
        fullName: patient.fullName,
        id: patient.id,
        dni: patient.dni,
        birthday: patient.birthday,
        gender: patient.gender,
        familyRelationship: patient.familyRelationship
      }));
      setPatients(patientsList);
    } else {
      console.error("Error al obtener pacientes:", response.message);
    }
    setLoading(false); 
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPatients();
    }, [])
  );

  return (
    <View className={styles.container}>
      <ButtonBack />
      <Text className={styles.title4}>Agenda de Familiares</Text>

      <View className={styles.containerBg1}>
        <View className={styles.containerTop}>
          <SearchBar
            value={searchText}
            onChangeText={handleSearch}
          />
          <AddButton onPress={handleAdd} />
        </View>

        <ScrollView 
          className={styles.containerFamily} 
          showsVerticalScrollIndicator={false}
        >
          {loading ? ( 
            <Loader />
          ) : (
            patients.filter(patient => patient.fullName.toLowerCase().includes(searchText.toLowerCase())).map((patient) => (
              <TouchableOpacity
                key={patient.id}
                className={styles.button2}
                onPress={() => handleSelect(patient)}>
                <FontAwesome5 name="user-alt" size={20} color="#539091" />
                <Text className={styles.buttonText2}>{patient.fullName}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default FamilyPage;



