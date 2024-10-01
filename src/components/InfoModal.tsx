import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string; 
  message: string; 
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, title, message }) => {

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
          <Text className="text-xl mb-4 text-center font-montserrat text-primary">{title}</Text>
          
          <Text className="text-base mb-6 text-center">{message}</Text>
          
          <View className="flex-row justify-around">
            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-lg"
              onPress={onClose} 
            >
              <Text className="text-white">Aceptar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

//USO
//<InfoModal
  //visible={modalVisible}
  //onClose={handleCloseModal}
  //title="TITULO"
  //message="MENSAJE"
///>

