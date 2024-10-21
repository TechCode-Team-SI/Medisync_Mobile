import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; 
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import { formatDate, formatGender } from '@/src/utils/changeFormat'; 
import { calculateAge} from '@/src/utils/calculateAge';

const UserFamilyPage: React.FC = () => {
  const { fullName, dni, birthday, gender } = useLocalSearchParams(); 

  const formattedBirthday = typeof birthday === 'string' ? birthday : (Array.isArray(birthday) ? birthday[0] : undefined);
  const formattedGender = typeof gender === 'string' ? gender : (Array.isArray(gender) ? gender[0] : undefined);

  return (
    <View className={styles.container}>
      <ButtonBack />
      <Text className={styles.title4}>{fullName}</Text>

      <View className={styles.containerBg1}>
        
        <Text className={styles.title3}>Cédula</Text>
        <View className={styles.containerData2}>
            <Text>{dni}</Text>
        </View>

        <Text className={styles.title3}>Fecha de nacimiento</Text>
        <View className={styles.containerData2}>
            <Text>{formattedBirthday ? formatDate(formattedBirthday) : "Fecha no disponible"}</Text>
        </View>

        <Text className={styles.title3}>Edad</Text>
        <View className={styles.containerData2}>
            <Text>{formattedBirthday ? calculateAge(formattedBirthday) : "Edad no disponible"}</Text>
        </View>

        <Text className={styles.title3}>Género</Text>
        <View className={styles.containerData2}>
            <Text>{formatGender(formattedGender)}</Text>
        </View>

      </View>
    </View>
  );
};

export default UserFamilyPage;






