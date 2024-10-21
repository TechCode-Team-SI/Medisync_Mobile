import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import DatePicker from "@/src/components/DatePicker";
import Entypo from '@expo/vector-icons/Entypo';
import Dropdown from "@/src/components/Dropdown"; 
import AlertModal from '@/src/components/Modal/AlertModal';
import { createUserPatient } from "@/src/services/familyGroup/familyServices";
import { getToken } from '@/src/services/auth/sessionServices';
import { isDateValid } from '@/src/utils/validators'; 

const genderOptions = [
    { label: "Femenino", value: "F" },
    { label: "Masculino", value: "M" },
];

const AddFamilyPage: React.FC = () => {
    const [inputName, setInputName] = useState('');
    const [inputDNI, setInputDNI] = useState('');
    const [inputCalendar, setInputCalendar] = useState<Date | null>(null); 
    const [selectedGender, setSelectedGender] = useState(''); 

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const valid = inputName.trim() !== '' &&
                      inputDNI.trim() !== '' &&
                      selectedGender !== '' &&
                      inputCalendar !== null &&
                      isDateValid(inputCalendar); 

        setIsFormValid(valid);
    }, [inputName, inputDNI, selectedGender, inputCalendar]);

    const resetFields = () => {
        setInputName('');
        setInputDNI('');
        setInputCalendar(null); 
        setSelectedGender('');
    };

    const handleSave = async () => {
        const token = await getToken();
      
        if (!token) {
            setModalMessage("No se encontró el token de autenticación.");
            setModalVisible(true);
            console.log("Error: No se encontró el token de autenticación.");
            return;
        }
      
        const patientData = {
            fullName: inputName,
            dni: inputDNI,
            gender: selectedGender,
            birthday: inputCalendar ? inputCalendar.toISOString() : '', 
        };
      
        try {
            const response = await createUserPatient(token, patientData);
            console.log("Respuesta del servidor:", response);
      
            if (response.success) {
                setModalMessage("Familiar añadido exitosamente.");
                setModalVisible(true);
                resetFields(); 
            } else if ('message' in response) {
                setModalMessage(response.message);
                setModalVisible(true);
            }
        } catch (error) {
            console.log("Error inesperado al añadir familiar:", error);
            setModalMessage("Error inesperado al añadir familiar.");
            setModalVisible(true);
        }
    };

    return (
        <View className={styles.container}>
            <ButtonBack />
            <Text className={styles.title4}>Añadir Familiar</Text>

            <View className={styles.containerBg1}>
                <Text className={styles.title3}>Nombres</Text>
                <View className={styles.inputContainer2}>
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

                <Text className={styles.title3}>Cédula</Text>
                <View className={styles.inputContainer2}>
                    <Entypo name="v-card" size={24} color="#539091" />
                    <TextInput
                        className={styles.input}
                        placeholder="Cédula"
                        placeholderTextColor="#539091"
                        value={inputDNI}
                        onChangeText={setInputDNI}
                        maxLength={15}
                    />
                </View>

                <Text className={styles.title3}>Sexo</Text>
                <Dropdown
                    options={genderOptions}
                    placeholder="Seleccione"
                    selectedValue={selectedGender}
                    onSelect={setSelectedGender}
                />

                <Text className={styles.title3}>Fecha de Nacimiento</Text>
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

                <View className={styles.container4}>
                    <TouchableOpacity
                        className={styles.button1}
                        onPress={handleSave}
                        disabled={!isFormValid} 
                        style={{
                            opacity: isFormValid ? 1 : 0.5 
                        }}
                    >
                        <Text className={styles.buttonText1}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AlertModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="ATENCIÓN"
                message={modalMessage}
            />
        </View>
    );
};

export default AddFamilyPage;



