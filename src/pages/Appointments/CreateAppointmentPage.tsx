import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "@/src/components/AppointmentsComponents/stylesCreate";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import Dropdown from "@/src/components/Dropdown"; 
import DatePicker from "@/src/components/DatePicker";
import { getUserPatients } from '@/src/services/familyGroup/familyServices';

const CreateAppointmentPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState(''); 
    const [selectedSchedule, setSelectedSchedule] = useState(''); 
    const [inputCalendar, setInputCalendar] = useState<Date | null>(null); 
    const [patientsOptions, setPatientsOptions] = useState<{ label: string; value: string; }[]>([]); 

    const fetchPatients = async () => {
        const response = await getUserPatients();

        if (response.success && response.data && Array.isArray(response.data.data)) {
            console.log("Usuarios/Pacientes obtenidos:", response.data.data);
            
            const patients = response.data.data.map((patient: any) => ({
                label: patient.fullName,  
                value: patient.id,        
            }));
            
            setPatientsOptions(patients);
        } else {
            console.error("Error: La respuesta de la API no tiene el formato esperado o no contiene pacientes.");
            console.error("Error de la API:", response.message);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <View className={styles.container}>

            <ButtonBack/>

            <Text className={styles.title1}> Agenda una cita </Text>
            
            <View className={styles.containerBg1}>  

                <Text className={styles.title3}>Seleccione el paciente</Text>
                <Dropdown
                    options={patientsOptions} 
                    placeholder="Seleccione"
                    selectedValue={selectedPatient}
                    onSelect={setSelectedPatient} 
                />
            
                <Text className={styles.title3}>Seleccione la fecha</Text>
                <DatePicker
                    value={inputCalendar} 
                    onChange={setInputCalendar}
                />

                <Text className={styles.title3}>Seleccione el horario</Text>
                <Dropdown
                    options={[
                        { label: "Horario1", value: "Horario1" },
                        { label: "Horario2", value: "Horario2" },
                    ]}
                    placeholder="Horarios disponibles"
                    selectedValue={selectedSchedule}
                    onSelect={setSelectedSchedule}
                />

                <View className={styles.container2}>
                    <TouchableOpacity
                        className={styles.button1}>
                        <Text className={styles.buttonText1}>Agendar</Text>
                    </TouchableOpacity>
                </View>

            </View> 
            
        </View>
    );
};

export default CreateAppointmentPage;


