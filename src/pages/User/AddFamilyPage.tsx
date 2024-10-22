import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";

import { createUserPatient } from "@/src/services/familyGroup/familyServices";
import { getToken } from '@/src/services/auth/sessionServices';
import { isDateValid } from '@/src/utils/validators'; 

import FormField from "@/src/components/Forms/FormField";
import Dropdown from "@/src/components/Forms/Dropdown"; 
import AlertModal from '@/src/components/Modal/AlertModal';
import DatePicker from "@/src/components/Forms/DatePicker";

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
                <FormField
                    icon="user"
                    placeholder="Nombre completo"
                    value={inputName}
                    onChangeText={setInputName}
                />

                <Text className={styles.title3}>Cédula</Text>
                <FormField
                    icon="v-card"
                    placeholder="Cédula"
                    value={inputDNI}
                    onChangeText={setInputDNI}
                />
                

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



