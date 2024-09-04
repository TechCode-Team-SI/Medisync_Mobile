import React, { useState } from 'react';
import { View, TouchableOpacity,ScrollView  } from 'react-native';
import styles from "@/src/components/styled-Cartelera/stylesSuggestion";
import TopBar from '@/src/components/TopBar';
import ItemList from './ItemList';
import Entypo from '@expo/vector-icons/Entypo';
import LoginPage from '@/src/pages/Login/LoginPage';


const ListSuggestion: React.FC = () => {

    const images = [  
        {   
          codigo: 'AA544',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Tike',
          estatus:'En Process',  
           
        },  
        {  
          codigo: 'AA534',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Tike',
          estatus:'Inactive',  
           
        },  
        {  
          codigo: 'AA554',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Tike',
          estatus:'En Process',  
         
      }, 
      {   
        codigo: 'AA548',
        fecha: '22-02-2024', 
        hora: '11:04 am', 
        tipoTike:'Tipo de Tike',
        estatus:'Inactive',  
    }, 
    {   
      codigo: 'AA534',
      fecha: '22-02-2024', 
      hora: '11:04 am', 
      tipoTike:'Tipo de Tike',
      estatus:'Inactive',  
  }, 


    ]; 


  return (
    <View className={styles.container}>
        <TopBar
            title="Historial"
            onLeftPress={() => console.log('Left pressed')}/ >

             <TouchableOpacity onPress={() => alert("")}className={styles.container1}>
                  {<Entypo name="back-in-time" size={25} color="#FFFF" />}
            </TouchableOpacity>
       
        
            <View className={styles.container2}>
                <ScrollView className={styles.container3}>  
                   {images.map((item, index) => (  
                     <ItemList  
                      key={index}
                      codigo={item.codigo}
                      fecha={item.fecha}
                      hora={item.hora}  
                      tipoTike={item.tipoTike}  
                      estatus={item.estatus}  />  
                      ))}  
                </ScrollView>  
          </View>
    </View>
  );
};

export default ListSuggestion;
