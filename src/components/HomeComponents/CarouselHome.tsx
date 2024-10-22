import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import data from "../../../data.json";
import { router } from 'expo-router'; 

const CarouselHome: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const duplicatedData = [...data, ...data]; 

  const handleReadMore = (item: any) => {
    router.push({
      pathname: '/publication',
      params: { item: JSON.stringify(item) }, 
    });
  };

  const getImageSource = (imageName: string) => {
    switch (imageName) {
      case 'arterial.jpeg':
        return require('../../../assets/posts/arterial.jpeg');
      case 'Artritis.jpeg':
        return require('../../../assets/posts/Artritis.jpeg');
      case 'cardiaca.jpeg':
        return require('../../../assets/posts/cardiaca.jpeg');
      case 'diabetes.jpeg':
        return require('../../../assets/posts/diabetes.jpeg');
      case 'epoc.jpg':
        return require('../../../assets/posts/epoc.jpg');
      default:
        return null; 
    }
  };

  return (   
    <View className="flex-1">
      <Text className="text-lg font-bold my-5 ml-5 text-[#539091]">
        Mantente informado
      </Text>

      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className="flex-1"
        onScrollEndDrag={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const width = event.nativeEvent.layoutMeasurement.width;
          const totalWidth = width * data.length;


          if (contentOffsetX >= totalWidth) {
            scrollViewRef.current?.scrollTo({ x: 0, animated: false });
          }
        }}
      >
        {duplicatedData.map((item, index) => (
          <View key={index} className="w-[300px] h-[300px] mx-0 justify-center border border-white">
            <Image source={getImageSource(item.image)} className="w-full h-full rounded-none" />
            <View style={{ backgroundColor: 'rgba(83, 144, 145, 0.8)' }}  className="absolute p-[20px] w-full border-white border-y-2 flex flex-col gap-y-[20px]">
              <Text className="text-white font-bold text-lg">{item.title}</Text>
              <Text numberOfLines={4} className="text-white">{item.content}</Text>
              <TouchableOpacity onPress={() => handleReadMore(item)}>
                <Text className="text-white font-bold text-right">Leer más</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CarouselHome; 
