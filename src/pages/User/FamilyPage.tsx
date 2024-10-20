import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import ButtonBack from '@/src/components/ProfileComponents/ButtonBack';
import styles from "@/src/components/ProfileComponents/stylesProfile"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AddButton from "@/src/components/AddButton";
import SearchBar from "@/src/components/SearchBar";
import { router } from "expo-router";

const FamilyPage: React.FC = () => {

  const handleSelect = () => {};

  const handleAdd = () => {
    router.push("/addfamily");
  };

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (

    <View className={styles.container}>

          <ButtonBack/>
          <Text className={styles.title4}> Agenda de Familiares</Text>
    
          <View className={styles.containerBg1}>

            <View className={styles.containerTop}>

              <SearchBar
                      value={searchText}
                      onChangeText={handleSearch}  />

              <AddButton onPress={handleAdd} />

            </View>

            <View className={styles.containerFamily}>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={styles.button2}
                    onPress={handleSelect}>
                    <FontAwesome5 name="user-alt" size={20} color="#539091"/>
                    <Text className={styles.buttonText2}>Nombre Apellido</Text>
                </TouchableOpacity>

            </View>

          </View>
    
        </View>
  );
};

export default FamilyPage;
