import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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

const relationshipOptions = [
    { label: "Madre", value: "madre" },
    { label: "Padre", value: "padre" },
    { label: "Hijo", value: "hijo" },
    { label: "Hija", value: "hija" },
    { label: "Hermano", value: "hermano" },
    { label: "Hermana", value: "hermana" },
    { label: "Abuela", value: "abuela" },
    { label: "Abuelo", value: "abuelo" },
    { label: "Nieto", value: "nieto" },
    { label: "Nieta", value: "nieta" },
    { label: "Tía", value: "tía" },
    { label: "Tío", value: "tío" },
    { label: "Primo/a", value: "primo/a" },
    { label: "Sobrino", value: "sobrino" },
    { label: "Sobrina", value: "sobrina" },
];

const AddFamilyPage: React.FC = () => {
    const [name, setName] = useState('');
    const [dni, setDNI] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null); 
    const [selectedGender, setSelectedGender] = useState(''); 
    const [selectedRelationship, setSelectedRelationship] = useState(''); 

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const valid = name.trim() !== '' &&
                      dni.trim() !== '' &&
                      selectedGender !== '' &&
                      selectedRelationship !== '' &&
                      birthday !== null &&
                      isDateValid(birthday); 

        setIsFormValid(valid);
    }, [name, dni, selectedGender, selectedRelationship, birthday]);

    const resetFields = () => {
        setName('');
        setDNI('');
        setBirthday(null); 
        setSelectedGender('');
        setSelectedRelationship('');
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
            fullName: name,
            dni: dni,
            gender: selectedGender,
            familyRelationship: selectedRelationship,
            birthday: birthday ? birthday.toISOString() : '', 
        };
      
        try {
            const response = await createUserPatient(token, patientData);
            console.log("Respuesta del servidor:", response);
      
            if (response.success) {
                setModalMessage("Familiar añadido exitosamente.");
                setModalVisible(true);
                resetFields(); 
            } else if ('message' in response) {
                setModalMessage(response.message || "Error al añadir familiar.");
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
            <Text className={styles.title5}>Añadir Familiar</Text>

            <ScrollView className={styles.containerBgFamily}>
                <Text className={styles.title3}>Nombres</Text>
                <FormField
                    icon="user"
                    placeholder="Nombre completo"
                    value={name}
                    onChangeText={setName}
                />

                <Text className={styles.title3}>Cédula</Text>
                <FormField
                    icon="v-card"
                    placeholder="Cédula"
                    value={dni}
                    onChangeText={setDNI}
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

                <Text className={styles.title3}>Parentesco</Text>
                <Dropdown
                    options={relationshipOptions}
                    placeholder="Seleccione"
                    selectedValue={selectedRelationship}
                    onSelect={setSelectedRelationship}
                />

                <View className={styles.container4}>
                    <TouchableOpacity
                        className={styles.buttonFamily}
                        onPress={handleSave}
                        disabled={!isFormValid} 
                        style={{
                            opacity: isFormValid ? 1 : 0.5 
                        }}
                    >
                        <Text className={styles.buttonText1}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
