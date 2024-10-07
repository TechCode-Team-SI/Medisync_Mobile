import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface TopBarSupportProps {
  title: string;
  leftIcon?: React.ReactNode;
}

const TopBarSupport: React.FC<TopBarSupportProps> = ({title, leftIcon }) => {

    const navigation = useNavigation(); 

    const handleBack = () => {
      navigation.goBack();  
    };

  return (
    <SafeAreaView className=" bg-primaryDisable">
        <View className='flex-row items-center p-1'>
          
            <TouchableOpacity onPress={handleBack} className="p-2">
                {leftIcon=<AntDesign name="arrowleft" size={24} color="#539091" />}   
                     
            </TouchableOpacity>

            <View className="flex-1 items-center">
                <Text className="text-primary text-lg font-roboto">{title}</Text>
             </View>

            <View className="w-10" />
        </View>
    </SafeAreaView>
  );
};

export default TopBarSupport;

