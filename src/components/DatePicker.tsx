import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './ProfileComponents/stylesProfile';

interface DatePickerProps {
    value: Date | null; 
    onChange: (date: Date | null) => void; 
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); 

    const handleChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        setSelectedDate(currentDate);

        onChange(currentDate); 
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View className={styles.inputContainer2}>
                    <Entypo name="calendar" size={24} color="#539091" />
                    <TextInput
                        className={styles.input}  
                        placeholder="dd/mm/aaaa"
                        placeholderTextColor="#539091"
                        value={value ? value.toLocaleDateString() : ''} 
                        editable={false} 
                    />
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate || new Date()} 
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleChange}
                />
            )}
        </View>
    );
};

export default DatePicker;
