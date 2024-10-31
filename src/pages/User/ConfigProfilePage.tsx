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
import AlertModal from '@/src/components/Modal/AlertModal';
import FormField from "@/src/components/Forms/FormField";

type UserImage = string | ImagePickerAsset | null;

const ConfigProfilePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState<UserImage>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result.success) {
        const userData = result.data;
        if (userData) {
          setName(userData.fullName);
          setEmail(userData.email);
          setPhone(userData.phone);
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
      fullName: name,
      phone: phone,
      ...(imageId && { photo: { id: imageId } }), 
    });
  
    if (updateUserResult.success) {
      setModalMessage("Perfil actualizado con éxito!");
      setModalVisible(true);
    } else {
      setModalMessage(updateUserResult.message || "Error al actualizar el perfil.");
      setModalVisible(true);
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
          <FormField
            icon="user"
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
            maxLength={100}
          />

          <Text className={styles.title3}> Correo</Text>
          <FormField
            icon="mail"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false}
          />

          <Text className={styles.title3}> Teléfono</Text>
          <FormField
            icon="phone"
            placeholder="xxxx-xxxxxxx"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad" 
            maxLength={20}
          />

          <View className={styles.container4}>
            <TouchableOpacity className={styles.button1} onPress={handleSave}>
              <Text className={styles.buttonText1}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="ATENCIÓN"
        message={modalMessage}
    />
    </View>
  );
};

export default ConfigProfilePage;