import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import Entypo from '@expo/vector-icons/Entypo';

const UpdatePasswordPage: React.FC = () => {

    const [inputPassword, setInputPassword] = useState('');
    const [inputNewPassword, setInputNewPassword] = useState('');
    const [inputRepeatPassword, setInputRepeatPassword] = useState('');

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleBack = () => {
    };

    return (
        <View className={styles.container1}>

          <View className={styles.containerBack}>
          <TouchableOpacity
            className={styles.buttonBack2}
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

            <Text className={styles.title}> Actualizar Contraseña</Text>

            <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091"/>
          <TextInput
          className={styles.input}
          placeholder="Contraseña actual"
          placeholderTextColor="#539091"
          value={inputPassword}
          onChangeText={setInputPassword}
          />
        </View>
        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091"/>
          <TextInput
          className={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#539091"
          value={inputNewPassword}
          onChangeText={setInputNewPassword}
          />
        </View>
        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091"/>
          <TextInput
          className={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#539091"
          value={inputRepeatPassword}
          onChangeText={setInputRepeatPassword}
          />
        </View>

        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button1}
            onPress={handleBack}
          >
            <Text className={styles.buttonText1}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
            </View>
    
          </View>
      );
};

export default UpdatePasswordPage;