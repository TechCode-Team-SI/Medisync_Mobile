import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import styles from '@/src/components/LoginComponents/stylesLogin';
import { Link, router } from "expo-router";

import { confirmCode } from "@/src/services/auth/authServices";
import AlertModal from '@/src/components/Modal/AlertModal';
import FormField from "@/src/components/Forms/FormField";
import CustomButton from '@/src/components/ui/CustomButton';


const CodePasswordPage: React.FC = () => {

  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = code !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [code]);

  const handleconfirmCode = async () => {
    const result = await confirmCode(code);  
  
    if (result.success) {
      console.log('Código válido');
      router.push("/changepassword"); 
    } else {
      console.log('Error:', result.message);
      setModalMessage(result.message || "Error. Código invalido." );
      setShowModal(true);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };
  

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>Ingresar Código</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>
           Por favor, ingrese el código que le hemos enviado a su correo electrónico.
        </Text>
        
        <FormField
          icon="lock"
          placeholder="Código"
          value={code}
          onChangeText={setCode}
          keyboardType="email-address"
        />

        <CustomButton
          onPress={handleconfirmCode}
          disabled={isButtonDisabled}
          title="Verificar"
        />

        <View className={styles.container6}>
          <Link href="/login" className={styles.textButton2}>
            Iniciar Sesión
          </Link>
        </View>

        <AlertModal
          visible={showModal}
          onClose={handleModalClose}
          title="ATENCIÓN"
          message={modalMessage}
        />

      </View>

    </View>
  );
};

export default CodePasswordPage;


