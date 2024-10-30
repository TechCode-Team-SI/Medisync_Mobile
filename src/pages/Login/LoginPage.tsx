import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from "@/src/components/LoginComponents/stylesLogin";
import { Link, router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import AlertModal from '@/src/components/Modal/AlertModal';
import InfoModal from '@/src/components/Modal/InfoModal';
import FormField from "@/src/components/Forms/FormField";
import PasswordField from '@/src/components/Forms/PasswordField';
import { login } from "@/src/services/auth/authServices"

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
      setModalMessage(result.message);
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

        <View className={styles.container4}>
          <TouchableOpacity
            className={styles.button}
            onPress={handleLogin}
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
          >
            <Text className={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

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
