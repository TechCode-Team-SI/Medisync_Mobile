import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface TopBarBackProps {
  title: string;
  leftIcon?: React.ReactNode;
  backgroundColor?: string; 
  textColor?: string;       
  iconColor?: string;       
}

const TopBarBack: React.FC<TopBarBackProps> = ({
  title,
  leftIcon,
  backgroundColor = '#A8DCD9', 
  textColor = '#539091',          
  iconColor = '#539091',       
}) => {
  const navigation = useNavigation();


  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <View className="flex-row items-center p-1">
        <TouchableOpacity onPress={handleBack} className="p-2">
          {leftIcon || (
            <AntDesign name="arrowleft" size={24} color={iconColor} />
          )}
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text style={{ color: textColor }} className="text-lg font-roboto">
            {title}
          </Text>
        </View>

        <View className="w-10" />
      </View>
    </SafeAreaView>
  );
};

export default TopBarBack;
