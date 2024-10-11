import React, { useState } from 'react';
import { View, TouchableOpacity,ScrollView  } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesSuggestion';
import ItemList from '@/src/components/SupportComponents/ItemList';
import TopBarSupport from '@/src/components/SupportComponents/TopBarSupport';


const SupportHistoryPage: React.FC = () => {

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

        <TopBarSupport title="Historial" />
        
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