import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "@/src/components/AppointmentsComponents/styleSearch";
import ButtonBack from "@/src/components/ProfileComponents/ButtonBack";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router } from "expo-router";
import SearchBar from "@/src/components/SearchBar";
import { getspecialites } from "@/src/services/appointments/specialtiesServices";
import { getDr } from "@/src/services/appointments/doctorsServices";
import { Specialties } from "@/src/services/appointments/specialtiesServices";
import Loader from "@/src/components/ui/Loader"; 

const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [specialties, setSpecialties] = useState<Specialties[]>([]);
  const [loading, setLoading] = useState(true); 

  const handleSelect = async (specialtyId: string, specialtyName: string) => {
    const result = await getDr(specialtyId);
    if (result.success && Array.isArray(result.data)) {
      router.push({
        pathname: "/searchdr",
        params: {
          doctors: JSON.stringify(result.data),
          specialtyName: specialtyName,
          specialtyId: specialtyId,
        },
      });
    } else {
      console.log("Error inesperado:");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); 
      const result = await getspecialites();
      if (result.success && Array.isArray(result.data)) {
        setSpecialties(result.data);
      } else {
        console.log("Error al obtener especialidades o la data no es un array");
      }
      setLoading(false); 
    };
    fetchUser();
  }, []);

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className={styles.container1}>
      <ButtonBack />
      <Text className={styles.title1}> Servicios</Text>

      <View className={styles.containerBg1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className={styles.containerSearch}>
            <SearchBar value={searchText} onChangeText={setSearchText} />
          </View>
          {loading ? ( 
            <View className={styles.loadingContainer}>
                <Loader />
            </View>
          ) : (
            <View className={styles.containerGrid}>
              {filteredSpecialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty.id}
                  className={styles.button}
                  onPress={() => handleSelect(specialty.id, specialty.name)}
                >
                  <Fontisto name="doctor" size={24} color="#539091" />
                  <Text className={styles.buttonText}>{specialty.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchPage;

