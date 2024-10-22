import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import Entypo from '@expo/vector-icons/Entypo';
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import { validatePasswordLength, validatePasswordsMatch } from '@/src/utils/validators'; 
import { changePassword, verifyCurrentPassword } from '@/src/services/password/updatePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePasswordPage: React.FC = () => {

  const [inputPassword, setInputPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputRepeatPassword, setInputRepeatPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBack = async (): Promise<void> => {
    if (!inputPassword || !inputNewPassword || !inputRepeatPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!validatePasswordLength(inputNewPassword)) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!validatePasswordsMatch(inputNewPassword, inputRepeatPassword)) {
      Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    // Verificar que la contraseña actual sea correcta
    const isCurrentPasswordValid = await verifyCurrentPassword(inputPassword);
    if (!isCurrentPasswordValid) {
      Alert.alert('Error', 'La contraseña actual no es correcta.');
      return;
    }

    try {
      // Cambiar la contraseña si la actual es correcta
      const result = await changePassword(inputPassword, inputNewPassword);

      
      if (result.success) {
        // Actualizar la contraseña almacenada en AsyncStorage
        await AsyncStorage.setItem('userPassword', inputNewPassword);
       
        Alert.alert('Éxito', 'La contraseña ha sido cambiada correctamente.');
        // Limpiar los campos después de actualizar la contraseña
        setInputPassword('');
        setInputNewPassword('');
        setInputRepeatPassword('');
      } else {
        Alert.alert('Error', result.message || 'Hubo un problema al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error en handleBack:', error);
      Alert.alert('Error', 'Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View className={styles.container}>
      <ButtonBack />

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

        <Text className={styles.title}>Actualizar Contraseña</Text>

        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Contraseña actual"
            placeholderTextColor="#539091"
            value={inputPassword}
            onChangeText={setInputPassword}
          />
        </View>
        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="Nueva contraseña"
            placeholderTextColor="#539091"
            value={inputNewPassword}
            onChangeText={setInputNewPassword}
          />
        </View>
        <View className={styles.inputContainer}>
          <Entypo name="lock" size={24} color="#539091" />
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