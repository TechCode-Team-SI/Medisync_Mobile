import React, { useState } from 'react';
import { View, TouchableOpacity,ScrollView  } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesSuggestion';
import TopBar from '@/src/components/Navigation/TopBar';
import SideMenuModal from '@/src/components/Navigation/SideMenuModal';
import ItemList from '@/src/components/SupportComponents/ItemList';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native'


const ListSuggestionsPage: React.FC = () => {

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
          codigo: 'AA544',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Ticket',
          estatus:'En Process',  
           
        },  
        {  
          codigo: 'AA534',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Ticket',
          estatus:'Inactive',  
           
        },  
        {  
          codigo: 'AA554',
          fecha: '22-02-2024', 
          hora: '11:04 am', 
          tipoTike:'Tipo de Ticket',
          estatus:'In Process',  
         
      }, 
      {   
        codigo: 'AA548',
        fecha: '22-02-2024', 
        hora: '11:04 am', 
        tipoTike:'Tipo de Ticket',
        estatus:'Inactive',  
    }, 
    {   
      codigo: 'AA534',
      fecha: '22-02-2024', 
      hora: '11:04 am', 
      tipoTike:'Tipo de Ticket',
      estatus:'Inactive',  
  }, 


    ]; 


  return (
    <View className={styles.container}>

        <TopBar title="Historial de sugerencias" onLeftPress={toggleMenu} />

        <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
        
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

export default ListSuggestionsPage;