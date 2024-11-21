import styles from "@/src/components/AppointmentsComponents/stylesCreate";
import ButtonBack from "@/src/components/Navigation/ButtonBack";
import { getUserPatients } from "@/src/services/familyGroup/familyServices";
import { getRequestTemplateBySpecialty } from "@/src/services/requestTemplates/requestTemplates";
import { UserPatient } from "@/src/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CreateAppointmentForm from "./CreateAppointmentForm";
import { getMedicTimeSlots } from "@/src/services/schedule/scheduleServices";
import { getDaysOffs } from "@/src/services/daysOffs/daysOffsService";
import { getMedicAgenda } from "@/src/services/agenda/agendaServices";
import Loader from "@/src/components/ui/Loader";

const CreateAppointmentPage: React.FC = () => {
  const { requestedDrId, requestedSpecialtyId, specialtyIsGroup } =
    useLocalSearchParams();

  const { data: requestTemplate } = useQuery({
    queryKey: [requestedSpecialtyId],
    queryFn: ({ queryKey }) => {
      if (typeof queryKey[0] === "string") {
        return getRequestTemplateBySpecialty(queryKey[0]);
      }
      return undefined;
    },
  });

  const { data: timeSlots } = useQuery({
    queryKey: ["timeSlots", requestedSpecialtyId, requestedDrId],
    queryFn: () => {
      switch (specialtyIsGroup) {
        case "true":
          return getMedicTimeSlots(requestedSpecialtyId as string, "specialty");
        default:
          return getMedicTimeSlots(requestedDrId as string, "user");
      }
    },
  });

  const { data: agenda } = useQuery({
    queryKey: ["agenda", requestedSpecialtyId, requestedDrId],
    queryFn: () => {
      switch (specialtyIsGroup) {
        case "true":
          return getMedicAgenda(requestedSpecialtyId as string, "specialty");
        default:
          return getMedicAgenda(requestedDrId as string, "user");
      }
    },
  });

  const { data: daysOffs } = useQuery({
    queryKey: ["daysOffs"],
    queryFn: () =>
      getDaysOffs({
        userId: requestedDrId as string,
        specialtyId: requestedSpecialtyId as string,
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
      }),
  });

  const [patients, setPatients] = useState<UserPatient[]>([]);

  const fetchPatients = async () => {
    const response = await getUserPatients();

    if (
      response.success &&
      response.data &&
      Array.isArray(response.data.data)
    ) {
      setPatients(response.data.data);
    } else {
      console.error(
        "Error: La respuesta de la API no tiene el formato esperado o no contiene pacientes."
      );
      console.error("Error de la API:", response.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <View className={styles.container}>
      <ButtonBack />

      <Text className={styles.title1}> Agenda una cita </Text>

      <View className={styles.containerBg1}>
        {requestTemplate && daysOffs && timeSlots && agenda ? (
          <CreateAppointmentForm
            requestTemplate={requestTemplate}
            userPatients={patients}
            requestedDrId={requestedDrId as string}
            requestedSpecialtyId={requestedSpecialtyId as string}
            daysOffs={daysOffs}
            timeSlots={timeSlots}
            workingDays={agenda.weekdays.join("_")}
          />
        ) : (
          <View className="flex justify-center items-center">
            <Loader />
          </View>
        )}
      </View>
    </View>
  );
};

export default CreateAppointmentPage;
