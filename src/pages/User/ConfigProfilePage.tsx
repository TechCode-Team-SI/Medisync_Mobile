import React, { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import ButtonBack from "@/src/components/ProfileComponents/ButtonBack";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';

const ConfigProfilePage: React.FC = () => {

    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSave = () => {};

    const pickImage = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert('Permission to access gallery is required!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };
    return (
        <View className={styles.container}>

          <ButtonBack/>

          <View className={styles.containerBg1}>

            <TouchableOpacity onPress={pickImage} className={styles.containerImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} className={styles.image} />
              ) : (
                <View className={styles.iconImage}>
                  <Entypo name="camera" size={24} color="#539091" />
                </View>
              )}
            </TouchableOpacity>

            <View className={styles.containerData}>
                       
              <Text className={styles.title3}> Nombre </Text>

              <View className={styles.inputContainer}>
                <Entypo name="lock" size={24} color="#539091"/>
                <TextInput
                className={styles.input}
                placeholder="Usuario"
                placeholderTextColor="#539091"
                value={inputName}
                onChangeText={setInputName}
                />
              </View>

              <Text className={styles.title3}> Correo</Text>

              <View className={styles.inputContainer}>
                <Entypo name="lock" size={24} color="#539091"/>
                <TextInput
                className={styles.input}
                placeholder="usuario@gmail.com"
                placeholderTextColor="#539091"
                value={inputEmail}
                onChangeText={setInputEmail}
                />
              </View>

              <Text className={styles.title3}> Teléfono</Text>

              <View className={styles.inputContainer}>
                <Entypo name="lock" size={24} color="#539091"/>
                <TextInput
                className={styles.input}
                placeholder="0412-XXXXXXX"
                placeholderTextColor="#539091"
                value={inputPhone}
                onChangeText={setInputPhone}
                />
              </View>

              <View className={styles.container4}>
                <TouchableOpacity
                  className={styles.button1}
                  onPress={handleSave}>
                  <Text className={styles.buttonText1}>Guardar cambios</Text>
                </TouchableOpacity>
              </View>

            </View>
        

          </View>
    
        </View>
      );
};

export default ConfigProfilePage;