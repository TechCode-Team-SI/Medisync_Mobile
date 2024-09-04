import React, { useState,useEffect } from 'react';
import { View,ScrollView } from 'react-native';
import styles from "@/src/components/styled-Cartelera/stylesCartelera";



import TopBar from '@/src/components/TopBar';
import ImageItem from './imageItem';


const Cartelera: React.FC = () => {
  const images = [  
    {  
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRraTBZdLdK539TF22atkmqeWjXBnfyEK6f3f_CVA3DQbheMqAVrHoMXqo7vyBYAtHm__Q&usqp=CAU', 
        title: 'medicine',
        date: '22-02-2024', 
        description: 'Descripción de imagen 1',    
       
    },  
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
    // Agrega más imágenes aquí según sea necesario  
];  
    return (
        <View className={styles.container}>
            <TopBar
                title="Cartelera Informativa"
                onLeftPress={() => console.log('Left pressed')}/ 
            >
       <View className={styles.container}>
            <ScrollView className={styles.container5}>  
            {images.map((item, index) => (  
                <ImageItem  
                key={index}
                imageUrl={item.url}
                title={item.title}
                description={item.description}
                date={item.date}              />  
            ))}  
        </ScrollView> 
      </View>
        </View>
      );

  
};

export default Cartelera;
