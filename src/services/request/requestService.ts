import { api } from "@/src/services/api/apiConfig";
import { genderEnum, RequestTemplate } from "@/src/types/types";
import { AppError } from "../error/appError";
import { HTTPError } from "../error/httpError";
import { transporterHTTP } from "../transporter";

interface createRequestServiceProps {
  patientFullName: string;
  patientDNI: string;
  patientAddress?: string;
  patientGender: genderEnum;
  patientBirthday: Date;
  requestTemplateId: string;
  medicId: string;
  specialtyId: string;
  appointmentHour: string;
  appointmentDate: Date;
  requestValues: (
    | {
        value: string;
        fieldQuestion: {
          id: string;
        };
      }
    | {
        fieldQuestion: {
          id: string;
        };
        selections: {
          id: string;
        }[];
      }
  )[];
}

export const createRequestService = async (
  props: createRequestServiceProps
): Promise<boolean> => {
  try {
    const data = await transporterHTTP.post<RequestTemplate>(
      api.createRequest,
      {
        patientFullName: props.patientFullName,
        patientDNI: props.patientDNI,
        patientAddress: props.patientAddress,
        patientGender: props.patientGender,
        patientBirthday: props.patientBirthday,
        appointmentHour: props.appointmentHour,
        appointmentDate: props.appointmentDate,
        requestTemplate: {
          id: props.requestTemplateId,
        },
        requestedMedic: {
          id: props.medicId,
        },
        requestedSpecialty: {
          id: props.specialtyId,
        },
        requestValues: props.requestValues,
      }
    );
    return !!data;
  } catch (error) {
    console.log("Error al obtener la plantilla de la solicitud:", error);
    if (error instanceof HTTPError) {
      return Promise.reject(
        new AppError({
          error: error.error,
          message: error.message,
        })
      );
    }
    return Promise.reject(
      new AppError({
        error: "internal_error",
        message: "ocurrio un error inesperado",
      })
    );
  }
};
