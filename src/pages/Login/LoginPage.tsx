import React, { useState, useEffect } from "react";
import { View, Text} from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import { Link, router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import AlertModal from '@/src/components/Modal/AlertModal';
import InfoModal from '@/src/components/Modal/InfoModal';
import FormField from "@/src/components/Forms/FormField";
import PasswordField from '@/src/components/Forms/PasswordField';
import { login } from "@/src/services/auth/authServices"
import CustomButton from "@/src/components/ui/CustomButton";

const LoginPage: React.FC = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = email !== '' && password !== '';
    setIsButtonDisabled(!allFieldsFilled); 
  }, [email, password]);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  const handleLogin = async () => {
    const result = await login(email, password);

    if (result.success) {
      setShowSuccessModal(true);
      
      router.replace('/homeuser'); 
    } else {
      setModalMessage(result.message || "Error al iniciar sesión." );
      setShowErrorModal(true);
    }
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title1}>¡Bienvenido de vuelta!</Text>

      <View className={styles.containerBelow}>
        <Text className={styles.title2}>Inicia sesión para continuar</Text>

        <FormField
          icon="mail"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <PasswordField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />

        <Link href="/forgot" className={styles.textButton}>
          ¿Ha olvidado su contraseña?
        </Link>

        <CustomButton
          onPress={handleLogin}
          disabled={isButtonDisabled}
          title="Iniciar Sesión"
        />

        <View className={styles.container3}>
          <Text>¿No tienes una cuenta?</Text>
          <Link href="/register" className={styles.textButton2}>
            Registrate
          </Link>
        </View>

        <InfoModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Bienvenido!"
        />

        <AlertModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="ATENCIÓN"
          message={modalMessage}
        />

      </View>
    </View>
  );
};

export default LoginPage;
