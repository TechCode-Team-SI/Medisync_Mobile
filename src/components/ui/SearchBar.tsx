import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar...", onChangeText, value }) => {
  return (
    <View className="bg-bgInput flex-1 rounded-lg p-2 mx-1">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#539091"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default SearchBar;
