import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile";
import DatePicker from "@/src/components/DatePicker";
import Entypo from '@expo/vector-icons/Entypo';
import Dropdown from "@/src/components/Dropdown"; 

const genderOptions = [
    { label: "Femenino", value: "F" },
    { label: "Masculino", value: "M" },
    { label: "Otro", value: "Otro" },
];

const AddFamilyPage: React.FC = () => {
    const [inputName, setInputName] = useState('');
    const [inputDNI, setInputDNI] = useState('');
    const [inputCalendar, setInputCalendar] = useState('');
    const [selectedGender, setSelectedGender] = useState(''); 


    const handleSave = () => {
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
                    onChange={setInputCalendar}
                />

                <View className={styles.container4}>
                    <TouchableOpacity
                        className={styles.button1}
                        onPress={handleSave}
                    >
                        <Text className={styles.buttonText1}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddFamilyPage;

