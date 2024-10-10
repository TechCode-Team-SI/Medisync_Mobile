import React, { useEffect, useState } from "react";
import { Text, View, ScrollView} from "react-native";
import { useFocusEffect } from '@react-navigation/native'

import styles from "@/src/components/HomeComponents/stylesHome";
import ButtonsHome from "@/src/components/HomeComponents/ButtonsHome";
import InfoHome from "@/src/components/HomeComponents/InfoHome";
import TopBar from "@/src/components/Navigation/TopBar";
import SideMenuModal from "@/src/components/Navigation/SideMenuModal";

import { getUser } from "@/src/services/user/userServices"


import ImageItem from '@/src/components/BoardComponents/imageItem';


const HomeUserPage: React.FC = () => {
  
  const images = [  
    {  
        url: 'https://concienciasaludable.uchile.cl/wp-content/uploads/2023/10/pexels-vanessa-loring-5966434-scaled-1.jpg',
        title: 'Alimentación saludable',  
        date:"08-10-2024",
        description: 'Para lograrlo, es necesario el...',   
       
    },  ]

  const [user, setUser] = useState<{ fullName: string }>({ fullName: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser= async () => {
      const result = await getUser();
      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.message);
      }
    };

    fetchUser();
  }, []);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useFocusEffect(
    React.useCallback(() => {
      setMenuVisible(false); 
    }, [])
  );

  return (
    <View className={styles.container}>
      <TopBar title="Inicio" onLeftPress={toggleMenu} />

      <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
        
      <ScrollView>

      <View className={styles.container2}>
        <Text className={styles.title}>Hola,</Text>
        <Text className={styles.title2}>{user.fullName}</Text>
      </View>

      <View className={styles.container3}>

        <ButtonsHome />

        <View className={styles.containerBoard}>
                    {images.map((item, index) => (  
                        <ImageItem  
                        key={index}
                        imageUrl={item.url}
                        title={item.title}
                        description={item.description}
                        date={item.date}             />  
                    ))}  
        </View>

        <InfoHome />
        
      </View>
      </ScrollView>
    </View>
  );
};

export default HomeUserPage;
