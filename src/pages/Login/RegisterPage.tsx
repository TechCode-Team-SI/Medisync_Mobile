import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '@/src/components/LoginComponents/stylesLogin';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";
import InfoModal from '@/src/components/InfoModal';
import { validateEmail, validatePasswordLength, validatePasswordsMatch } from "@/src/utils/validators";
import { useFocusEffect } from '@react-navigation/native';

const RegisterPage: React.FC = () => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  useEffect(() => {
    const allFieldsFilled = inputEmail !== '' && inputPhone !== '' && inputPassword !== '' && inputPassword2 !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [inputEmail, inputPhone, inputPassword, inputPassword2]);

  useFocusEffect(
    React.useCallback(() => {
      setInputEmail('');
      setInputPhone('');
      setInputPassword('');
      setInputPassword2('');
      setSelectedImage(null);
    }, [])
  );

  const handleRegister = () => {
    if (!validateEmail(inputEmail)) {
      setModalMessage('El email no es válido.');
      setModalVisible(true);
      return;
    }

    if (!validatePasswordLength(inputPassword)) {
      setModalMessage('La contraseña debe tener al menos 8 caracteres.');
      setModalVisible(true);
      return;
    }

    if (!validatePasswordsMatch(inputPassword, inputPassword2)) {
      setModalMessage('Las contraseñas no coinciden.');
      setModalVisible(true);
      return;
    }

    // LOGICA
    alert('Registro exitoso');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={styles.container}>
          <Text className={styles.title1}>¡Regístrate!</Text>

          <View className={styles.containerRegister}>
            <Text className={styles.title3}>Por favor, ingrese la información</Text>

            <TouchableOpacity onPress={pickImage} className={styles.containerImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} className={styles.image} />
              ) : (
                <View className={styles.iconImage}>
                  <Entypo name="camera" size={24} color="#539091" />
                </View>
              )}
            </TouchableOpacity>

            <View className={styles.inputContainer}>
              <Entypo name="mail" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Email"
                placeholderTextColor="#539091"
                value={inputEmail}
                onChangeText={setInputEmail}
                maxLength={30}
              />
            </View>

            <View className={styles.inputContainer}>
              <Entypo name="phone" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#539091"
                keyboardType="numeric"
                value={inputPhone}
                onChangeText={setInputPhone}
                maxLength={30}
              />
            </View>

            <View className={styles.inputContainer}>
              <Entypo name="lock" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#539091"
                value={inputPassword}
                onChangeText={setInputPassword}
                secureTextEntry={!showPassword}
                maxLength={30}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color="#539091" />
              </TouchableOpacity>
            </View>

            <View className={styles.inputContainer}>
              <Entypo name="lock" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#539091"
                value={inputPassword2}
                onChangeText={setInputPassword2}
                secureTextEntry={!showPassword2}
                maxLength={30}
              />
              <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                <Entypo name={showPassword2 ? "eye-with-line" : "eye"} size={24} color="#539091" />
              </TouchableOpacity>
            </View>

            <View className={styles.container4}>
              <TouchableOpacity
                className={styles.button}
                onPress={handleRegister}
                disabled={isButtonDisabled}
                style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
              >
                <Text className={styles.buttonText}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>

            <View className={styles.container5}>
              <Text>¿Ya tienes cuenta?</Text>
              <Link href="/login" className={styles.textButton2}>Inicia Sesión</Link>
            </View>
          </View>
        </View>

        <InfoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;
