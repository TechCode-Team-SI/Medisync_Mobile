import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity ,ScrollView,Image} from 'react-native';
import styles from "@/src/components/styled-Cartelera/stylesPublication";

import { Link } from 'expo-router'; 
import TopBar from '@/src/components/TopBar';
import ImageItem from './imageItem';
import Entypo from '@expo/vector-icons/Entypo';

////const  medicina2 = require('@/assets/images/medicina2.jpeg')
/////<Image source={medicina2} className={styles.image1}/>

const Publication: React.FC = () => {
    
    return (
        <View className={styles.container}>
        
            <TopBar
                title="Publication"
                onLeftPress={() => console.log('Left pressed')} />
        <TouchableOpacity onPress={() => alert("")} className="p-2">
                  { <Entypo name="arrow-with-circle-left" size={30} color="#FFFF" />}
         </TouchableOpacity>
         <Text  className={styles.title1}> Medicine </Text>
         <Text  className={styles.title2}> 22/08/2024 </Text>

            <View className={styles.container1}>

                <Text className={styles.title3}> Imformation</Text>

                <View className={styles.container2}>
                    
                <Text className={styles.title4}> Imformation</Text>
                        
                </View>

            </View>

        </View>
    );
}

export default Publication;
