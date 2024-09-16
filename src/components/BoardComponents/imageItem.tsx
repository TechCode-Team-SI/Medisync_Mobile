import React from 'react';  
import { View, Text,ImageBackground,TouchableOpacity}  from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import styles from './stylesBoard';
import { Link, router } from "expo-router";

interface ImageItemProps {  
    imageUrl: string;  
    description: string;  
    date: string;
    title: string;
}  

const ImageItem: React.FC<ImageItemProps> = ({ imageUrl, description,date,title}) => { 
    const navigation = useNavigation();  
    const handlePublication = () => {
        router.push("/publication");
      };
    return (  
        <View className={styles.container6}> 
             <TouchableOpacity onPress={handlePublication} > 
            <ImageBackground source={{ uri: imageUrl }} className={styles.image}>  
            <View className={styles.overlay}>
            <Text className={styles.title3}>{title}</Text>   
            <Text className={styles.date}>{date}</Text> 
            <Text className={styles.description}>{description}</Text> 
            </View>
            </ImageBackground>
            </TouchableOpacity>      
        </View>  
    );  
};  


export default ImageItem; 