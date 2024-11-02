import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import styles from "../Styles/styles";

interface TimeSlotPickerProps {
  availableTimeSlots: string[];
  initialValue?: string;
  onChange: (timeSlot: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  initialValue,
  onChange,
  availableTimeSlots,
}) => {
  const [showTimeSlotPicker, setShowTimeSlotPicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
    initialValue || null
  );

  const handleChange = (selectedSlot: string) => {
    const currentSlot = selectedSlot;
    setShowTimeSlotPicker(false);
    setSelectedTimeSlot(currentSlot);

    onChange(currentSlot);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowTimeSlotPicker(true)}>
        <View className={"flex-row items-center bg-bgInput w-full p-3 h-12"}>
          <Entypo name="calendar" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="seleccione un horario"
            placeholderTextColor="#539091"
            value={selectedTimeSlot ? selectedTimeSlot : undefined}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={showTimeSlotPicker}
          onDismiss={() => setShowTimeSlotPicker(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            marginHorizontal: "auto",
          }}
        >
          <Text className="font-montserrat text-primary text-lg mb-2">
            Horarios disponibles
          </Text>

          <ScrollView>
            <View>
              {availableTimeSlots.map((timeSlot, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="w-full py-2 items-center justify-center border-b border-primary"
                  onPress={() => handleChange(timeSlot)}
                >
                  <Text className="text-lg text-primary font-montserrat">
                    {timeSlot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default TimeSlotPicker;
