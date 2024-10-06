import React, { useState } from 'react';
import { View, TouchableOpacity,ScrollView  } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesSuggestion';
import TopBar from '@/src/components/Navigation/TopBar';
import SideMenuModal from '@/src/components/Navigation/SideMenuModal';
import ItemList from '@/src/components/SupportComponents/ItemList';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native'


const SupportHistoryPage: React.FC = () => {

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
          codigo: '#0005',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTicket:'Tipo de Ticket',
          estatus:'Pendiente',  
           
        },  
        {  
          codigo: '#0004',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTicket:'Tipo de Ticket',
          estatus:'Cerrado',  
           
        },  
        {  
          codigo: '#0003',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTicket:'Tipo de Ticket',
          estatus:'En proceso',  
         
      }, 
      {   
        codigo: '#0002',
        fecha: '22-02-2024', 
        hora: '11:04 am', 
        tipoTicket:'Tipo de Ticket',
        estatus:'Cerrado',  
    }, 
    {   
      codigo: '#0001',
      fecha: '22-02-2024', 
      hora: '11:04 am', 
      tipoTicket:'Tipo de Ticket',
      estatus:'Pendiente',  
  }, 


    ]; 


  return (
    <View className={styles.container}>

        <TopBar title="Historial" onLeftPress={toggleMenu} />

        <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
        
            <View className={styles.container2}>
                <ScrollView className={styles.container3}>  
                   {images.map((item, index) => (  
                     <ItemList  
                      key={index}
                      codigo={item.codigo}
                      fecha={item.fecha}
                      hora={item.hora}  
                      tipoTicket={item.tipoTicket}  
                      estatus={item.estatus}  />  
                      ))}  
                </ScrollView>  
          </View>
    </View>
  );
};

export default SupportHistoryPage;