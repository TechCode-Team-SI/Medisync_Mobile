import React from 'react';  
import { View, Text, TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import styles from './stylesSuggestion';
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ItemListProps {   
    codigo: string;  
    fecha: string;
    hora: string;
    tipoTicket: string;
    estatus: string;
}  

const ItemList: React.FC<ItemListProps> = ({ codigo, fecha, hora, tipoTicket, estatus }) => { 

    const handleChat = () => {
        router.push("/chat");
    };

    const navigation = useNavigation();  

    return (  
        // Hacer clickeable todo el contenedor
        <TouchableOpacity onPress={handleChat} className={styles.container5}>  
            <View className={styles.overlay}>
                <Text className={styles.title}>{codigo}</Text> 
                <View className={styles.overlay2}> 
                    <Text className={styles.hora}>{hora}</Text>
                    <Text className={styles.date}>{fecha}</Text> 
                </View>
                <Text className={styles.text}>{tipoTicket}</Text> 
                <Text className={styles.title}>{estatus}</Text> 
            </View>

            <View className={styles.containerIcon}>  
                <MaterialCommunityIcons name="headset" size={48} color="white" />
            </View>   
        </TouchableOpacity>  
    );  
};  

export default ItemList;
