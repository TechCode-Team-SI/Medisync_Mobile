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

interface DataPickerProps {
  options: { label: string; value: string }[];
  placeholder: string;
  onSelect: (value: string) => void;
  modalTitle: string;
  initialValue?: string;
}
const DataPicker = ({
  onSelect,
  options,
  placeholder,
  modalTitle,
  initialValue,
}: DataPickerProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    initialValue
  );
  const [showDataPicker, setShowDataPicker] = useState(false);

  const handleChange = (selectedSlot: string) => {
    const currentSlot = selectedSlot;
    setSelectedValue(currentSlot);
    setShowDataPicker(false);
    onSelect(currentSlot);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowDataPicker(true)}>
        <View className={"flex-row items-center bg-bgInput w-full p-3 h-12"}>
          <TextInput
            className={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#539091"
            value={
              selectedValue
                ? options.find((opt) => opt.value === selectedValue)?.label
                : undefined
            }
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={showDataPicker}
          onDismiss={() => setShowDataPicker(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            marginHorizontal: "auto",
          }}
        >
          <Text className="font-montserrat text-primary text-lg mb-2">
            {modalTitle}
          </Text>

          <ScrollView>
            <View>
              {options.map(({ label, value }, idx) => (
                <TouchableOpacity
                  key={idx}
                  className={`w-full py-2 items-center justify-center ${idx ! ==options.length-1?"border-b border-primary" : ""} `}
                  onPress={() => handleChange(value)}
                >
                  <Text className="text-lg text-primary font-montserrat">
                    {label}
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

export default DataPicker;

