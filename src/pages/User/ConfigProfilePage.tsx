import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import styles from "@/src/components/ProfileComponents/stylesProfile";
import ButtonBack from "@/src/components/ProfileComponents/ButtonBack";
import Entypo from "@expo/vector-icons/Entypo";
import { pickImage } from "@/src/utils/imagePicker";
import { getUser, updateUserProfile } from "@/src/services/user/userServices";
import { uploadImage } from "@/src/services/files/filesServices";
import { ImagePickerAsset } from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

type UserImage = string | ImagePickerAsset | null;

const ConfigProfilePage: React.FC = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState<UserImage>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result.success) {
        const userData = result.data;
        if (userData) {
          setInputName(userData.fullName);
          setInputEmail(userData.email);
          setInputPhone(userData.phone);
          setSelectedImage(userData?.photo?.path ?? ''); 
        }
      } else {
        console.error(result.message);
      }
    };

    fetchUserData();
  }, []);

  const handlePicture = async () => {
    const image = await pickImage();
    setSelectedImage(image);
  };

  const handleSave = async () => {
    let imageId = null;
  
    if (selectedImage && typeof selectedImage !== 'string') {
      imageId = await uploadImage(selectedImage as ImagePickerAsset);
    }
  
    const updateUserResult = await updateUserProfile({
      fullName: inputName,
      phone: inputPhone,
      ...(imageId && { photo: { id: imageId } }), 
    });
  
    if (updateUserResult.success) {
      alert("Perfil actualizado con éxito!");
      navigation.goBack();
    } else {
      alert(updateUserResult.message || "Error al actualizar el perfil.");
    }
  };
  

  return (
    <View className={styles.container}>
      <ButtonBack />
      <View className={styles.containerBg1}>
        <TouchableOpacity
          onPress={handlePicture}
          className={styles.containerImage}
        >
          {selectedImage ? (
            <Image
              source={{ uri: typeof selectedImage === 'string' ? selectedImage : selectedImage.uri }}
              className={styles.image}
            />
          ) : (
            <View className={styles.iconImage}>
              <Entypo name="camera" size={24} color="#539091" />
            </View>
          )}
        </TouchableOpacity>

        <View className={styles.containerData}>
          <Text className={styles.title3}> Nombres </Text>
          <View className={styles.inputContainer}>
            <Entypo name="lock" size={24} color="#539091" />
            <TextInput
              className={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#539091"
              value={inputName}
              onChangeText={setInputName}
            />
          </View>

          <Text className={styles.title3}> Correo</Text>
          <View className={styles.inputContainer}>
            <Entypo name="lock" size={24} color="#539091" />
            <TextInput
              className={styles.input}
              placeholder="email"
              placeholderTextColor="#539091"
              value={inputEmail}
              editable={false}
            />
          </View>

          <Text className={styles.title3}> Teléfono</Text>
          <View className={styles.inputContainer}>
            <Entypo name="lock" size={24} color="#539091" />
            <TextInput
              className={styles.input}
              placeholder="XXXX-XXXXXXX"
              placeholderTextColor="#539091"
              value={inputPhone}
              onChangeText={setInputPhone}
            />
          </View>

          <View className={styles.container4}>
            <TouchableOpacity className={styles.button1} onPress={handleSave}>
              <Text className={styles.buttonText1}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConfigProfilePage;
