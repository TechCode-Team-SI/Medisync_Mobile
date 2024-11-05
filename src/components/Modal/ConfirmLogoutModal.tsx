// ConfirmLogoutModal.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface ConfirmLogoutModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: '80%', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>¿Seguro que quieres salir de tu cuenta?</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity onPress={onConfirm} style={{ padding: 10, backgroundColor: '#539091', borderRadius: 5, marginHorizontal: 10 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Salir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 5, marginHorizontal: 10 }}>
              <Text style={{ color: 'black', fontSize: 16 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmLogoutModal;
