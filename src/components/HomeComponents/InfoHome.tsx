import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './stylesHome';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getMedicalCenters } from "@/src/services/medicalcenters/infoServices";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const InfoHome: React.FC = () => {
    const [medicalCenters, setMedicalCenters] = useState<{
        name: string,
        state: string, 
        municipality: string, 
        parish: string, 
        localPhone: string, 
        address: string, 
        mobilePhone: string,
        email: string | null,
        facebookName: string | null,
        instagramName: string | null,
        tiktokName: string | null,
        twitterName: string | null
    }>({
        localPhone: '', 
        address: "", 
        state: "", 
        mobilePhone: "",
        municipality: "",
        parish: "",
        name: "",
        email: null,
        facebookName: null,
        instagramName: null,
        tiktokName: null,
        twitterName: null
    });

    const [error, setError] = useState<string | null>(null);

    const hasSocialMedia = medicalCenters.facebookName || medicalCenters.instagramName || medicalCenters.tiktokName || medicalCenters.twitterName;

    useEffect(() => {
        const fetchMedicalCenters = async () => {
            const result = await getMedicalCenters();
            if (result.success) {
                setMedicalCenters(result.data);
            } else {
                setError(result.message || "Error al obtener información del centro médico.");
            }
        };

        fetchMedicalCenters();
    }, []);

    const handlePhonePress = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleEmailPress = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleSocialPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View className={styles.containerInfo}>
            <Text className={styles.titleInfo}>Ubícanos</Text>

            <View className={styles.containerInfo2}>

                <View className={styles.containerInfo3}>
                    <Entypo name="location" size={23} color="#539091" />
                    <View className={styles.containerText}>
                      <Text className={styles.textInfo}>{medicalCenters.parish}, {medicalCenters.municipality}, {medicalCenters.state}</Text>
                    </View>
                </View>

                <View className={styles.containerInfo3}>
                    <Entypo name="location-pin" size={24} color="#539091" />
                    <View className={styles.containerText}>
                      <Text className={styles.textInfo}>{medicalCenters.address}</Text>
                    </View>
                </View>

                <TouchableOpacity className={styles.containerInfo3} onPress={() => handlePhonePress(medicalCenters.mobilePhone || '')}>
                    <Entypo name="phone" size={24} color="#539091" />
                    <View className={styles.containerText}>
                      <Text className={styles.textInfo}>{medicalCenters.mobilePhone}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className={styles.containerInfo3} onPress={() => handlePhonePress(medicalCenters.localPhone || '')}>
                    <Entypo name="old-phone" size={24} color="#539091" />
                    <View className={styles.containerText}>
                      <Text className={styles.textInfo}>{medicalCenters.localPhone}</Text>
                    </View>
                </TouchableOpacity>

                {hasSocialMedia && (
                    <View className='items-center py-3'>
                      <Text className={styles.titleInfo}>Conéctate con nosotros</Text>
                    </View>
                )}

                {medicalCenters.email && (
                    <TouchableOpacity className={styles.containerInfo3} onPress={() => medicalCenters.email && handleEmailPress(medicalCenters.email)}>
                        <MaterialIcons name="email" size={21} color="#539091" />
                        <View className={styles.containerText}>
                          <Text className={styles.textInfo}>{medicalCenters.email}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {medicalCenters.facebookName && (
                    <TouchableOpacity className={styles.containerInfo3} onPress={() => handleSocialPress(`https://facebook.com/${medicalCenters.facebookName}`)}>
                      <Entypo name="facebook" size={20} color="#539091" />
                      <View className={styles.containerText}>
                          <Text className={styles.textInfo}>{medicalCenters.facebookName}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {medicalCenters.instagramName && (
                    <TouchableOpacity className={styles.containerInfo3} onPress={() => handleSocialPress(`https://instagram.com/${medicalCenters.instagramName?.replace('@', '')}`)}>
                        <FontAwesome6 name="square-instagram" size={23} color="#539091" />
                        <View className={styles.containerText}>
                            <Text className={styles.textInfo}>{medicalCenters.instagramName}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {medicalCenters.twitterName && (
                    <TouchableOpacity className={styles.containerInfo3} onPress={() => handleSocialPress(`https://twitter.com/${medicalCenters.twitterName}`)}>
                        <FontAwesome6 name="square-x-twitter" size={23} color="#539091" />
                        <View className={styles.containerText}>
                          <Text className={styles.textInfo}>{medicalCenters.twitterName}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {medicalCenters.tiktokName && (
                    <TouchableOpacity className={styles.containerInfo3} onPress={() => handleSocialPress(`https://tiktok.com/${medicalCenters.tiktokName}`)}>
                        <FontAwesome5 name="tiktok" size={23} color="#539091" />
                        <View className={styles.containerText}>
                          <Text className={styles.textInfo}>{medicalCenters.tiktokName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InfoHome;

