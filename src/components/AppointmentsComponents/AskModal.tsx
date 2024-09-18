import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';

interface AskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AskModal: React.FC<AskModalProps> = ({ visible, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (!visible) {
      onClose(); 
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <View className="bg-white p-8 rounded-lg w-3/4">
          <Text className="text-xl mb-4 text-center font-montserrat text-primary">Agenda tu cita</Text>
          <Text className="text-base mb-6 text-center">¿El paciente está registrado?</Text>
          <View className="flex-row justify-around">
            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-lg"
              onPress={() => {
                router.push('/createappointment');
                onClose(); 
              }}
            >
              <Text className="text-white">Si</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-cancel px-6 py-2 rounded-lg"
              onPress={() => {
                router.push('/createappointmenttwo');
                onClose(); 
              }}
            >
              <Text className="text-white">No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AskModal;
