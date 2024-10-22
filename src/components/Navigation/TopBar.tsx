import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TopBarProps {
  title: string;
  onLeftPress?: () => void;
  leftIcon?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({title ,onLeftPress, leftIcon }) => {
  return (
    <SafeAreaView className=" bg-primary">
        <View className='flex-row items-center p-1'>
          
            <TouchableOpacity onPress={onLeftPress} className="p-2">
                {leftIcon=<MaterialIcons name="menu" size={24} color="white" />}        
            </TouchableOpacity>

            <Text className="text-white text-lg ml-4 font-roboto">{title}</Text>
        </View>
    </SafeAreaView>
  );
};

export default TopBar;

///USO
///<TopBar title="Nombre de la pantalla" onLeftPress={toggleMenu} />
