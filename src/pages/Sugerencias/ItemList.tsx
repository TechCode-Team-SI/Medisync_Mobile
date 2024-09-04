import React from 'react';  
import { View, Text,StyleSheet ,TouchableOpacity}  from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "@/src/components/styled-Cartelera/stylesSuggestion";


interface ItemListProps {   
    codigo: string;  
    fecha: string;
    hora:string;
    tipoTike: string;
    estatus:string;
}  

const ItemList: React.FC<ItemListProps> = ({  codigo,fecha,hora,tipoTike,estatus }) => { 
    const navigation = useNavigation();  
    return (  
        <View className={styles.container5}>  
             <TouchableOpacity onPress={() => alert("Information")}> 
            <View className={styles.overlay}>
            <Text className={styles.title}>{codigo}</Text> 
            <View className={styles.overlay2}> 
            <Text className={styles.hora}>{hora}</Text>
            <Text className={styles.date}>{fecha}</Text> 
            </View>
            <Text className={styles.title}>{tipoTike}</Text> 
            <Text className={styles.title}>{estatus}</Text> 
            </View>
            </TouchableOpacity> 
            <View className={styles.container6}>  
            <FontAwesome name="user-md" size={95} color="#68C3B7" />
            </View>   
        </View>  
    );  
};  

export default ItemList; 