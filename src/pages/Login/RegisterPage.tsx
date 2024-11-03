import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '@/src/components/LoginComponents/stylesLogin';
import FormField from "@/src/components/Forms/FormField";
import Dropdown from "@/src/components/Forms/Dropdown"; 
import DatePicker from "@/src/components/Forms/DatePicker";
import PasswordField from '@/src/components/Forms/PasswordField';
import AlertModal from '@/src/components/Modal/AlertModal';
import { Link, router } from "expo-router";
import { handleRegister } from '@/src/services/auth/authUtils';
import { isDateValid } from '@/src/utils/validators';
import InfoModal from '@/src/components/Modal/InfoModal';

import { getToken} from "@/src/services/auth/sessionServices";
import { useFocusEffect } from '@react-navigation/native';

const genderOptions = [
  { label: "Femenino", value: "F" },
  { label: "Masculino", value: "M" },
];

const RegisterPage: React.FC = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputDNI, setInputDNI] = useState('');
  const [inputCalendar, setInputCalendar] = useState<Date | null>(null); 
  const [selectedGender, setSelectedGender] = useState(''); 
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

   // Método para verificar el token
 const checkToken = async () => {
  const token = await getToken(); 
  console.log("prueba registro");
   return token !== null;
   
    };

    useFocusEffect(
         React.useCallback(() => {
           const validateToken = async () => {
           const tokenExists = await checkToken();
             if (tokenExists) {
               router.replace('/homeuser'); 
              }
            };
            validateToken();
          }, [])
        );
 
  useEffect(() => {
    const allFieldsFilled = 
      inputEmail !== '' && 
      inputName !== '' && 
      inputPassword !== '' && 
      inputPassword2 !== '' && 
      inputCalendar !== null && 
      inputDNI !== '' && 
      selectedGender !== '';
    
    setIsButtonDisabled(!allFieldsFilled); 
  }, [inputEmail, inputName, inputPassword, inputPassword2, inputCalendar, inputDNI, selectedGender]);

  const onRegister = async () => {
    await handleRegister({
      inputEmail,
      inputPassword,
      inputPassword2,
      inputName,
      inputPhone,
      inputDNI, 
      inputCalendar, 
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
        value={inputEmail}
        onChangeText={setInputEmail}
        keyboardType="email-address"
      />
      <FormField
        icon="user"
        placeholder="Nombre completo"
        value={inputName}
        onChangeText={setInputName}
      />
      <FormField
        icon="phone"
        placeholder="Teléfono (opcional)"
        value={inputPhone}
        onChangeText={setInputPhone}
        keyboardType="phone-pad" 
      />
      <FormField
        icon="v-card"
        placeholder="Cédula"
        value={inputDNI}
        onChangeText={setInputDNI}
      />
      <Dropdown
        options={genderOptions}
        placeholder="Género"
        selectedValue={selectedGender}
        onSelect={setSelectedGender}
      />
      <DatePicker
        value={inputCalendar} 
        onChange={(date) => {
          if (isDateValid(date)) {
            setInputCalendar(date);
          } else {
            setModalMessage("La fecha de nacimiento no puede ser futura.");
            setModalVisible(true);
          }
        }}
      />
      <PasswordField
        placeholder="Contraseña"
        value={inputPassword}
        onChangeText={setInputPassword}
      />
      <PasswordField
        placeholder="Confirmar Contraseña"
        value={inputPassword2}
        onChangeText={setInputPassword2}
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
  );
};

export default RegisterPage;


