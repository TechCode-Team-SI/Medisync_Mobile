import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z
    .string({ required_error: "paciente requerido" })
    .min(1, "Seleccione un paciente"),
  appointmentHour: z
    .string({ required_error: "hora de cita requerida" })
    .min(1, "Ingrese la hora de la cita"),
  appointmentDate: z.date({ required_error: "Fecha de cita requerida" }),
  requestValues: z.array(
    z
      .object({
        fieldQuestion: z.object({
          id: z.string().min(1),
        }),
        value: z.string().min(1, "campo requerido"),
      })
      .or(
        z.object({
          fieldQuestion: z.object({
            id: z.string().min(1),
          }),
          selections: z
            .array(
              z.object({
                id: z.string().min(1),
              })
            )
            .min(1, "seleccion requerida"),
        })
      )
  ),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
