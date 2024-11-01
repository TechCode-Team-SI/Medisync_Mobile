import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '@/src/components/LoginComponents/stylesLogin';
import FormField from "@/src/components/Forms/FormField";
import Dropdown from "@/src/components/Forms/Dropdown"; 
import DatePicker from "@/src/components/Forms/DatePicker";
import PasswordField from '@/src/components/Forms/PasswordField';
import AlertModal from '@/src/components/Modal/AlertModal';
import { Link } from "expo-router";
import { handleRegister } from '@/src/services/auth/authUtils';
import { isDateValid } from '@/src/utils/validators';
import InfoModal from '@/src/components/Modal/InfoModal';

const genderOptions = [
  { label: "Femenino", value: "F" },
  { label: "Masculino", value: "M" },
];

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dni, setDNI] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null); 
  const [selectedGender, setSelectedGender] = useState(''); 
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = 
      email !== '' && 
      name !== '' && 
      password !== '' && 
      password2 !== '' && 
      birthday !== null && 
      dni !== '' && 
      selectedGender !== '';
    
    setIsButtonDisabled(!allFieldsFilled); 
  }, [email, name, password, password2, birthday, dni, selectedGender]);

  const onRegister = async () => {
    await handleRegister({
      email,
      password,
      password2,
      name,
      phone,
      dni, 
      birthday, 
      selectedGender,
      setModalMessage,
      setModalVisible,
      setShowSuccessModal
    });
  };

  const renderItem = ({ item }: any) => (
    <View className={styles.containerRegister}>
      <Text className={styles.title3}>Por favor, ingrese la información</Text>

      <FormField
        icon="mail"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FormField
        icon="user"
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        maxLength={100}
      />
      <FormField
        icon="phone"
        placeholder="Teléfono (opcional)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad" 
        maxLength={20}
      />
      <FormField
        icon="v-card"
        placeholder="Cédula"
        value={dni}
        onChangeText={setDNI}
        maxLength={20}
      />
      <Dropdown
        options={genderOptions}
        placeholder="Sexo"
        selectedValue={selectedGender}
        onSelect={setSelectedGender}
      />
      <DatePicker
        value={birthday} 
        onChange={(date) => {
          if (isDateValid(date)) {
            setBirthday(date);
          } else {
            setModalMessage("La fecha de nacimiento no puede ser futura.");
            setModalVisible(true);
          }
        }}
      />
      <PasswordField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
      />
      <PasswordField
        placeholder="Confirmar Contraseña"
        value={password2}
        onChangeText={setPassword2}
      />
      <TouchableOpacity
        className={styles.button}
        onPress={onRegister}
        disabled={isButtonDisabled}
        style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
      >
        <Text className={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <View className={styles.container5}>
        <Text>¿Ya tienes cuenta?</Text>
        <Link href="/login" className={styles.textButton2}>Inicia Sesión</Link>
      </View>

      <InfoModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Bienvenido!"
        />

      <AlertModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />
    </View>
  );

  return (
 
    <SafeAreaView className={styles.safeArea}>
    <StatusBar  backgroundColor="#539091" barStyle="light-content" />
    <View className={styles.container2}>
    <FlatList
      data={[{}]} 
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View className={styles.containerTitle}>
          <Text className={styles.title1}>¡Regístrate!</Text>
        </View>
      }
    />
    </View>
    </SafeAreaView>
  );
};

export default RegisterPage;


