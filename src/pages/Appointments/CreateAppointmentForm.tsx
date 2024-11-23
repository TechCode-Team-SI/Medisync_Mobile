import styles from "@/src/components/AppointmentsComponents/stylesCreate";
import DataPicker from "@/src/components/Forms/DataPicker";
import DatePickerCustom from "@/src/components/Forms/DatePickerCustom";
import FieldWrapper from "@/src/components/Forms/FieldWrapper";
import TimeSlotPicker from "@/src/components/Forms/TimeSlotPicker";
import AlertModal from "@/src/components/Modal/AlertModal";
import { createRequestService } from "@/src/services/request/requestService";
import {
  FieldQuestion,
  FieldQuestionTypeEnum,
  genderEnum,
  RequestTemplate,
  UserPatient,
} from "@/src/types/types";
import { getNotWorkingWeekdays } from "@/src/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { createAppointmentSchema, CreateAppointmentSchema } from "./schema";
import Loader from "@/src/components/ui/LoaderPopup";

interface CreateAppointmentFormProps {
  requestedDrId: string;
  requestedSpecialtyId: string;
  requestTemplate: RequestTemplate;
  userPatients: UserPatient[];
  daysOffs: string[];
  timeSlots: string[];
  workingDays: string;
}

const CreateAppointmentForm = (props: CreateAppointmentFormProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const createRequest = useMutation({
    mutationFn: createRequestService,
    onError: (error) => {
      setModalMessage("Error al crear la solicitud");
      setModalVisible(true);
    },
    onSuccess: () => {
      setModalMessage("Solicitud creada con éxito");
      setModalVisible(true);
    },
  });
  const form = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      requestValues: props.requestTemplate.fields.map(({ fieldQuestion }) => {
        if (fieldQuestion.type === FieldQuestionTypeEnum.SELECTION) {
          const selections = fieldQuestion.selections || [];
          const selectionId = selections.length > 0 ? selections[0].id : "";
          return {
            fieldQuestion: {
              id: fieldQuestion.id,
            },
            selections: [{ id: selectionId }],
          };
        } else {
          return {
            fieldQuestion: {
              id: fieldQuestion.id,
            },
            value: "",
          };
        }
      }),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "requestValues",
  });

  interface PatientOption {
    label: string;
    value: string;
    isMainPatient: boolean;
    relationship?: string;
  }

  const [patientsOptions, setPatientsOptions] = useState<PatientOption[]>([]);

  useEffect(() => {
    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (str: string | undefined) => {
      if (!str) return "Familiar"; // Valor por defecto
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const patients = props.userPatients.map((patient: any) => ({
      label: patient.fullName,
      value: patient.id,
      isMainPatient: patient.familyRelationship === "yo",
      relationship: patient.familyRelationship,
    }));

    const mainPatient = patients.find((patient) => patient.isMainPatient);
    const familyPatients = patients.filter((patient) => !patient.isMainPatient);

    setPatientsOptions([
      ...(mainPatient
        ? [
            {
              ...mainPatient,
              label: `${mainPatient.label} (Yo)`,
            },
          ]
        : []),
      ...familyPatients.map((family, index) => ({
        ...family,
        label: `${family.label} (${capitalizeFirstLetter(
          family.relationship
        )})`,
        isLast: index === familyPatients.length - 1,
      })),
    ]);
  }, [props.userPatients]);

  const onSubmit = (data: CreateAppointmentSchema) => {
    const { patientId, ...rest } = data;
    const selectedPatient = props.userPatients.find(
      (patient) => patient.id === patientId
    );
    if (!selectedPatient) {
      return;
    }
    createRequest.mutate({
      ...rest,
      patientFullName: selectedPatient.fullName,
      patientDNI: selectedPatient.dni,
      patientGender: selectedPatient.gender as genderEnum,
      patientBirthday: selectedPatient.birthday,
      medicId: props.requestedDrId,
      specialtyId: props.requestedSpecialtyId,
      requestTemplateId: props.requestTemplate.id,
    });
  };

  return (
    <View>
      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          router.push("/homeuser");
        }}
        title="ATENCIÓN"
        message={modalMessage}
      />
      <Loader showLoader={createRequest.isPending} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className={styles.title3}>Seleccione el paciente</Text>
        <Controller
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <>
              <FieldWrapper errorState={form.formState.errors.patientId}>
                <DataPicker
                  modalTitle="Seleccione un paciente"
                  placeholder="Paciente"
                  options={patientsOptions}
                  onSelect={field.onChange}
                />
              </FieldWrapper>
            </>
          )}
        />

        {props.requestTemplate && (
          <View>
            {props.requestTemplate.fields.map((field, idx) => {
              const errorStates = form.formState.errors.requestValues;
              const errorState = errorStates && errorStates[idx];

              const currentField = fields[idx];
              if ("value" in currentField) {
                return (
                  <FieldWrapper
                    key={field.id}
                    errorState={
                      errorState && "value" in errorState
                        ? (errorState.value as { message?: string })
                        : undefined
                    }
                  >
                    <FieldRenderer
                      field={field.fieldQuestion}
                      fieldIndex={idx}
                      control={form.control}
                      value={currentField.value}
                    />
                  </FieldWrapper>
                );
              }
              if ("selections" in currentField) {
              }
              return (
                <FieldWrapper
                  key={field.id}
                  errorState={
                    errorState && "selections" in errorState
                      ? (errorState.selections as { message?: string })
                      : undefined
                  }
                >
                  <FieldRenderer
                    field={field.fieldQuestion}
                    fieldIndex={idx}
                    control={form.control}
                    value={currentField.selections[0].id}
                  />
                </FieldWrapper>
              );
            })}
          </View>
        )}

        <Text className={styles.title3}>Seleccione la fecha</Text>
        <Controller
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FieldWrapper errorState={form.formState.errors.appointmentDate}>
              <DatePickerCustom
                value={field.value}
                onChange={(date) => {
                  if (date) {
                    field.onChange(date);
                  }
                }}
                disabledWeekDays={getNotWorkingWeekdays(props.workingDays)}
                disabledDays={props.daysOffs}
              />
            </FieldWrapper>
          )}
        />

        <Text className={styles.title3}>Seleccione el horario</Text>
        <Controller
          control={form.control}
          name="appointmentHour"
          render={({ field }) => (
            <FieldWrapper errorState={form.formState.errors.appointmentHour}>
              <TimeSlotPicker
                availableTimeSlots={props.timeSlots}
                initialValue={field.value}
                onChange={field.onChange}
              />
            </FieldWrapper>
          )}
        />

        <View className={styles.container2}>
          <TouchableOpacity
            className={styles.button1}
            onPress={form.handleSubmit(onSubmit)}
          >
            <Text className={styles.buttonText1}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

interface FieldRendererProps {
  field: FieldQuestion;
  control: Control<CreateAppointmentSchema>;
  value: string;
  fieldIndex: number;
}

const TextFieldRenderer = ({
  field,
  control,
  fieldIndex,
  value,
}: FieldRendererProps) => {
  return (
    <View>
      <Text className={styles.title3}>{field.label}</Text>
      <Text>{field.description}</Text>
      <View className={styles.inputContainer}>
        <Controller
          control={control}
          name={`requestValues.${fieldIndex}.value`}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              value={field.value}
              className={styles.input}
            />
          )}
        />
      </View>
    </View>
  );
};

const NumberFieldRenderer = ({
  field,
  fieldIndex,
  control,
  value,
}: FieldRendererProps) => {
  return (
    <View>
      <Text className={styles.title3}>{field.label}</Text>
      <Text>{field.description}</Text>
      <View className={styles.inputContainer}>
        <Controller
          control={control}
          name={`requestValues.${fieldIndex}.value`}
          render={({ field }) => (
            <TextInput
              keyboardType="numeric"
              onChangeText={field.onChange}
              value={field.value}
              className={styles.input}
            />
          )}
        />
      </View>
    </View>
  );
};

const SelectionFieldRenderer = ({
  field,
  fieldIndex,
  control,
  value,
}: FieldRendererProps) => {
  const renderSelectionField = () => {
    switch (field.selectionConfig!.isMultiple) {
      case true:
        return (
          <Controller
            control={control}
            name={`requestValues.${fieldIndex}.selections`}
            render={({ field: currentField }) => (
              <>
                {(field.selections || []).map((s) => (
                  <View className="flex flex-row items-center" key={s.id}>
                    <Checkbox
                      status={
                        currentField.value.some((v) => v.id === s.id)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        if (currentField.value.some((v) => v.id === s.id)) {
                          currentField.onChange(
                            currentField.value.filter((v) => v.id !== s.id)
                          );
                        } else {
                          currentField.onChange([
                            ...currentField.value,
                            { id: s.id },
                          ]);
                        }
                      }}
                    />
                    <Text>{s.value}</Text>
                  </View>
                ))}
              </>
            )}
          />
        );
      default:
        return (
          <Controller
            control={control}
            name={`requestValues.${fieldIndex}.selections`}
            render={({ field: currentField }) => (
              <RadioButton.Group
                onValueChange={(val) => {
                  currentField.onChange([{ id: val }]);
                }}
                value={currentField.value[0].id}
              >
                {(field.selections || []).map((s) => (
                  <View className="flex flex-row items-center" key={s.id}>
                    <RadioButton value={s.id} />
                    <Text>{s.value}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            )}
          />
        );
    }
  };

  return (
    <View className="py-4">
      <Text className={styles.title3}>{field.label}</Text>
      <Text>{field.description}</Text>
      {renderSelectionField()}
    </View>
  );
};

const FieldRenderer = ({
  field,
  control,
  fieldIndex,
  value,
}: FieldRendererProps) => {
  switch (field.type) {
    case FieldQuestionTypeEnum.TEXT:
      return (
        <TextFieldRenderer
          field={field}
          control={control}
          fieldIndex={fieldIndex}
          value={value}
        />
      );
    case FieldQuestionTypeEnum.NUMBER:
      return (
        <NumberFieldRenderer
          field={field}
          control={control}
          fieldIndex={fieldIndex}
          value={value}
        />
      );
    case FieldQuestionTypeEnum.SELECTION:
      return (
        <SelectionFieldRenderer
          field={field}
          control={control}
          fieldIndex={fieldIndex}
          value={value}
        />
      );
  }
};
export default CreateAppointmentForm;
