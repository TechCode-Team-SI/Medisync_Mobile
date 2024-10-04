//////ARREGLAR////////

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity ,ScrollView,Image} from 'react-native';
import styles from '@/src/components/BoardComponents/stylesBoard';
import Entypo from '@expo/vector-icons/Entypo';
import TopBar from '@/src/components/Navigation/TopBar';
import SideMenuModal from '@/src/components/Navigation/SideMenuModal';
import { useFocusEffect } from '@react-navigation/native'

////const  medicina2 = require('@/assets/images/medicina2.jpeg')
/////<Image source={medicina2} className={styles.image1}/>

const PublicationPage: React.FC = () => {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(prev => !prev);
    };
  
    useFocusEffect(
      React.useCallback(() => {
        setMenuVisible(false); 
      }, [])
    );
    
    return (
        <View className={styles.container}>
        
            <TopBar title="Publicación" onLeftPress={toggleMenu} />

            <SideMenuModal isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />

                <TouchableOpacity onPress={() => alert("")} className="p-2">
                        { <Entypo name="arrow-with-circle-left" size={30} color="#FFFF" />}
                </TouchableOpacity>

                <Text  className={styles.title}> Medicine </Text>
                <Text  className={styles.title2}> 22/08/2024 </Text>

                    <View className={styles.container2}>

                        <Text className={styles.title3}> Imformation</Text>

                        <View className={styles.container2}>
                            
                        <Text className={styles.title3}> Imformation</Text>
                                
                        </View>

                    </View>

        </View>
    );
}

export default PublicationPage;