import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import Entypo from '@expo/vector-icons/Entypo';

const ProfilePage: React.FC = () => {

  const inputAge = useState('');
    const inputGender = useState('');
    const inputBlood = useState('');


    const handleBack = () => {};
    const handleUpdate = () => {};
    const handleSecurity = () => {};
    const handleLogOut = () => {};

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <View className={styles.container}>

          <View className={styles.containerBack}>
          <TouchableOpacity
            className={styles.buttonBack1}
            onPress={handleBack}>
              <Entypo name="chevron-left" size={24} color="#FFFFFF"></Entypo>
          </TouchableOpacity>
          </View>
    

          <View className={styles.containerBg1}>

         <View className={styles.containerImage}>
          {selectedImage ? (
              <Image source={{ uri: selectedImage }} className={styles.image} />
            ) : (
              <View className={styles.iconImage}>
                <Entypo name="camera" size={24} color="#539091" />
              </View>
            )}
          </View>

            <Text className={styles.title1}> Usuario</Text>

            <View className={styles.containerRow}>
            <TextInput
          className={styles.titleFlex}
          placeholder="Age"
          placeholderTextColor="#539091"
          value={inputAge}
          readOnly="true"
          />
               <TextInput
          className={styles.titleFlex}
          placeholder="Gender"
          placeholderTextColor="#539091"
          value={inputGender}
          readOnly="true"
          />
              <TextInput
          className={styles.titleFlex}
          placeholderTextColor="#539091"
          placeholder="Blood"
          value={inputBlood}
          readOnly="true"
          />
              </View>

            <View className={styles.container3}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleUpdate}>
              <Entypo name='edit' size={24} color="#539091" ></Entypo>
            <Text className={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>


        </View>
        <View className={styles.container3}>
        <TouchableOpacity
            className={styles.button}
            onPress={handleSecurity}>
              <Entypo name='cog' size={24} color="#539091" ></Entypo>
            <Text className={styles.buttonText}>Seguridad</Text>
          </TouchableOpacity>

        </View>

        <View className={styles.container3}>
        <TouchableOpacity
            className={styles.button}
            onPress={handleLogOut}>
              <Entypo name='log-out' size={24} color="#539091" ></Entypo>
            <Text className={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
          
            </View>
    
          </View>
      );
};

export default ProfilePage;