import styles from "@/src/components/AppointmentsComponents/styleSearch";
import ButtonBack from "@/src/components/Navigation/ButtonBack";
import Loader from "@/src/components/ui/Loader";
import SearchBar from "@/src/components/ui/SearchBar";
import { getDr } from "@/src/services/appointments/doctorsServices";
import { getspecialites } from "@/src/services/appointments/specialtiesServices";
import { Specialty } from "@/src/types/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSelect = async (specialty: Specialty) => {
    if (specialty.isGroup) {
      router.push({
        pathname: "/createappointment",
        params: {
          requestedSpecialtyId: specialty.id,
          specialtyIsGroup: `${specialty.isGroup}`,
        },
      });
    } else {
      const result = await getDr(specialty.id);
      if (result.success && Array.isArray(result.data)) {
        router.push({
          pathname: "/searchdr",
          params: {
            doctors: JSON.stringify(result.data),
            specialtyName: specialty.name,
            specialtyId: specialty.id,
            specialtyIsGroup: `${specialty.isGroup}`,
          },
        });
      } else {
        console.log("Error inesperado:");
      }
    }
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      const result = await getspecialites();
      if (result.success && Array.isArray(result.data)) {
        setSpecialties(result.data);
      } else {
        console.log("Error al obtener especialidades o la data no es un array");
      }
      setLoading(false);
    };
    fetchSpecialties();
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
                  onPress={() => handleSelect(specialty)}
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
