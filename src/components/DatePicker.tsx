// DatePicker.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './ProfileComponents/stylesProfile';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        setSelectedDate(currentDate);

        const formattedDate = currentDate.toLocaleDateString(); // FORMATO
        onChange(formattedDate); 
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View className={styles.inputContainer2}>
                    <Entypo name="calendar" size={24} color="#539091" />
                    <TextInput
                        className={styles.input}  
                        placeholder="xx/xx/xxxx"
                        placeholderTextColor="#539091"
                        value={value}
                        editable={false} 
                    />
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
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
