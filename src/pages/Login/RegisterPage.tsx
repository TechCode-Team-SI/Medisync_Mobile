import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from '@/src/components/LoginComponents/stylesLogin';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";
import AlertModal from '@/src/components/Modal/AlertModal';
import { useFocusEffect } from '@react-navigation/native';
import { handleRegister } from '@/src/services/auth/authUtils';

const RegisterPage: React.FC = () => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = inputEmail !== '' && inputName !== '' && inputPassword !== '' && inputPassword2 !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [inputEmail, inputName, inputPassword, inputPassword2]);

  useFocusEffect(
    React.useCallback(() => {
      setInputEmail('');
      setInputName('');
      setInputPhone('');
      setInputPassword('');
      setInputPassword2('');
    }, [])
  );

  const onRegister = async () => {
    await handleRegister({
      inputEmail,
      inputPassword,
      inputPassword2,
      inputName,
      inputPhone,
      setModalMessage,
      setModalVisible,
    });
  };

  return (
    <ScrollView>
        <View className={styles.container}>

          <View className={styles.containerTitle}>
            <Text className={styles.title1}>¡Regístrate!</Text>
          </View>

          

          <View className={styles.containerRegister}>

            <Text className={styles.title3}>Por favor, ingrese la información</Text>

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
              <Entypo name="user" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#539091"
                value={inputName}
                onChangeText={setInputName}
                maxLength={60}
              />
            </View>

            <View className={styles.inputContainer}>
              <Entypo name="phone" size={24} color="#539091" />
              <TextInput
                className={styles.input}
                placeholder="Teléfono (opcional)"
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
                onPress={onRegister}
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
          <AlertModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />
        </View>
        </ScrollView>

  );
};

export default RegisterPage;
