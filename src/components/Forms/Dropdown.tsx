import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../Styles/styles';

interface DropdownProps {
    options: { label: string, value: string }[];
    placeholder: string;
    selectedValue: string;
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, selectedValue, onSelect }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value); 
        setIsDropdownOpen(false); 
    };

    const selectedLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

    return (
        <View className="mb-5">
            <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                <View className={styles.dropdownContainer}>
                    <Entypo name="chevron-thin-down" size={24} color="#539091" />
                    <Text className="flex-1 ml-1 text-primary">
                        {selectedLabel} 
                    </Text>
                </View>
            </TouchableOpacity>

            {isDropdownOpen && (
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item.value)}>
                            <Text
                                className={`p-2 text-primary ${item.value === selectedValue ? 'bg-bgMenu' : ''}`}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )}
                    className="bg-white border border-primary"
                />
            )}
        </View>
    );
};

export default Dropdown;
