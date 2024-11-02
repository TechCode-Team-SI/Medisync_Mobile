import Entypo from "@expo/vector-icons/Entypo";
import { addDays, addMonths, format, parse } from "date-fns";
import React, { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { Modal, Portal } from "react-native-paper";
import styles from "../Styles/styles";

const formatToDisabledDays = (disabledDays: Date[]) => {
  const disabledDaysMap: MarkedDates = {};
  const formattedDays =
    disabledDays?.map((day) => format(day, "yyy-MM-dd")) || [];
  for (const day of formattedDays) {
    if (!disabledDaysMap[day]) {
      disabledDaysMap[day] = { disabled: true, disableTouchEvent: true };
    }
  }
  return disabledDaysMap;
};

interface DatePickerCustomProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: string;
  maxDate?: string;
  disabledDays?: string[];
  //weekDay is between 1 (monday) to 7 (sunday)
  disabledWeekDays?: number[];
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
  value,
  onChange,
  maxDate,
  minDate,
  disabledDays,
  disabledWeekDays,
}) => {
  const [showDatePickerCustom, setShowDatePickerCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState<Date[]>([]);

  const today = useMemo(
    () => format(new Date().toISOString(), "yyyy-MM-dd"),
    []
  );

  const disabledDaysFormatted = useMemo(() => {
    const formattedDays = disabledDays?.map((day) => new Date(day)) || [];
    return formatToDisabledDays(formattedDays);
  }, [disabledDays]);

  const getDisabledRowDays = () => {
    if (!disabledWeekDays) return {};
    const disabledDays: Date[] = [];

    for (const day of daysOfCurrentMonth) {
      const weekday = +format(day, "i");
      if (disabledWeekDays?.includes(weekday)) {
        disabledDays.push(day);
      }
    }

    return formatToDisabledDays(disabledDays);
  };

  const handleChange = () => {
    if (selectedDate) {
      onChange(parse(selectedDate, "yyyy-MM-dd", new Date()));
      setShowDatePickerCustom(false);
    }
  };

  const handleMonthChange = (date: DateData) => {
    const days: Date[] = [];
    const end = addMonths(new Date(date.timestamp), 2);
    let start = addMonths(new Date(date.timestamp), -2);
    start.setUTCDate(1);
    start.setUTCHours(0, 0, 0, 0);

    while (start <= end) {
      days.push(start);
      start = addDays(start, 1);
    }
    setDaysOfCurrentMonth(days);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowDatePickerCustom(true)}>
        <View className={"flex-row items-center bg-bgInput w-full p-3 h-12"}>
          <Entypo name="calendar" size={24} color="#539091" />
          <TextInput
            className={styles.input}
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#539091"
            value={value ? value.toLocaleDateString() : ""}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={showDatePickerCustom}
          onDismiss={() => setShowDatePickerCustom(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            marginHorizontal: "auto",
          }}
        >
          <Text className="font-montserrat text-primary text-lg mb-2">
            Seleccione la fecha
          </Text>

          <Calendar
            markedDates={{
              [selectedDate || ""]: {
                selected: true,
                selectedColor: "#539091",
              },
              [today]: {
                today: true,
                selected: selectedDate === today,
                selectedColor: "#539091",
                disabled: true,
              },
              ...disabledDaysFormatted,
              ...getDisabledRowDays(),
            }}
            minDate={minDate}
            maxDate={maxDate}
            initialDate={today}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            onMonthChange={handleMonthChange}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
          <View className="flex justify-center items-end mt-2">
            <TouchableOpacity
              onPress={handleChange}
              className="px-4 py-3 items-center justify-center bg-primary rounded-md"
            >
              <Text className="text-sm text-principal font-montserrat">
                Seleccionar
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default DatePickerCustom;
