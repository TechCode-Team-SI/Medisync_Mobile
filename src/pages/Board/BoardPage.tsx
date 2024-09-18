///// ARREGLAR //////

import React, { useState,useEffect } from 'react';
import { View,ScrollView } from 'react-native';
import styles from '@/src/components/BoardComponents/stylesBoard';

import ImageItem from '@/src/components/BoardComponents/imageItem';

import SideMenuModal from '@/src/components/navigation/SideMenuModal';
import TopBar from '@/src/components/navigation/TopBar';
import { useFocusEffect } from '@react-navigation/native'


const BoardPage: React.FC = () => {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(prev => !prev);
    };
  
    useFocusEffect(
      React.useCallback(() => {
        setMenuVisible(false); 
      }, [])
    );

  const images = [  
    {  
        url: 'https://cdn.euroinnova.edu.es/euroinnova_es/next-gen-formats-img/m/Maestria-Medicina-Interna.webp',
        title: 'medicine',  
        date:"11-02-2023",
        description: 'Descripción de imagen 2',   
       
    },  
    {  
      url: 'https://www.doctorponce.com/wp-content/uploads/2024/04/medicina-pasada-de-moda-actual-pendiente-doctor-ponce.png', 
      title: 'medicine', 
      date:"15-08-2023",
      description: 'Descripción de imagen 3',   
     
  }, 
  {  
    url: 'https://www.nosequeestudiar.net/site/assets/files/1695520/medicina-medico-estetoscopio.jpg', 
    title: 'medicine', 
    date:"15-08-2023",
    description: 'Descripción de imagen 4',   
   
}, 
{  
  url: 'https://www.doctorponce.com/wp-content/uploads/2024/04/medicina-pasada-de-moda-actual-pendiente-doctor-ponce.png', 
  title: 'medicine', 
  date:"15-08-2023",
  description: 'Descripción de imagen 3',   
 
},
    
];  
    return (
        <View className={styles.container}>
            
            <TopBar title="Cartelera informativa" onLeftPress={toggleMenu} />

            <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

            <View className={styles.container}>
                    <ScrollView className={styles.container5} >  
                    {images.map((item, index) => (  
                        <ImageItem  
                        key={index}
                        imageUrl={item.url}
                        title={item.title}
                        description={item.description}
                        date={item.date}             />  
                    ))}  
                </ScrollView> 
            </View>
        </View>
      );

  
};

export default BoardPage;