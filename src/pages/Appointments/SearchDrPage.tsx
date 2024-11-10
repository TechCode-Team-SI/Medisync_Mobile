import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "@/src/components/AppointmentsComponents/styleSearch";
import ButtonBack from "@/src/components/Navigation/ButtonBack";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { Dr } from "@/src/services/appointments/doctorsServices";
import SearchBar from "@/src/components/ui/SearchBar";
import Loader from "@/src/components/ui/Loader"; 

const SearchDrPage: React.FC = () => {
  const router = useRouter();
  const { doctors, specialtyName, specialtyId } = useLocalSearchParams();

  const [drs, setdrs] = useState<Dr[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (doctors) {
      setdrs(JSON.parse(doctors as string)); 
    }
    setLoading(false); 
  }, [doctors]);

  const handleSelect = (drId: string) => {
    router.push({
      pathname: "/createappointment",
      params: {
        requestedDrId: drId,
        requestedSpecialtyId: specialtyId,
      },
    });
  };

  const filteredDrs = drs.filter(dr => 
    dr.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className={styles.container1}>
      <ButtonBack />
      <Text className={styles.title1}>{specialtyName}</Text>

      <View className={styles.containerBg2}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className={styles.title2}>Especialistas Disponibles</Text>

          <View className={styles.containerSearch}>
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {loading ? ( 
            <View className={styles.loadingContainer}>
              <Loader />
            </View>
          ) : (
            <View className={styles.container}>
              {filteredDrs.map((dr) => (
                <TouchableOpacity
                  key={dr.id}
                  className={styles.button2}
                  onPress={() => handleSelect(dr.id)}
                >
                  <FontAwesome5 name="user-alt" size={26} color="#539091" />
                  <Text className={styles.buttonText2}>
                    Dr. {dr.fullName || "Nombre no disponible"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchDrPage;

