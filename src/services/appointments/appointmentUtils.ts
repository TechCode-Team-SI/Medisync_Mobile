import { getRequestsMadeByMe } from "@/src/services/request/requestServices";
import { calculateAge } from "@/src/utils/calculateAge";
import { formatDate, formatGender, formatStatus } from "@/src/utils/changeFormat";

export const fetchAppointments = async (statuses: string[]) => {
  const result = await getRequestsMadeByMe();

  if (!result.success) {
    console.error(result.message);
    return [];
  }

  return result.data
    .map((request: any) => ({
      id: request.id,
      name: request.patientFullName,
      dni: request.patientDNI,
      gender: formatGender(request.patientGender),
      age: calculateAge(request.patientBirthday),
      specialization: request.requestedSpecialty.name,
      doctor: request.requestedMedic
        ? request.requestedMedic.fullName
        : "De turno",
      status: formatStatus(request.status),
      date: formatDate(request.appointmentDate),
      time: request.appointmentHour,
    }))
    .filter((appointment: any) => statuses.includes(appointment.status));
};
