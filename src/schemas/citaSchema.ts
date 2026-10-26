import { z } from "zod";

const fechaActual = () => {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

export const citaSchema = z.object({
  pacienteNombre: z.string().min(1, "Selecciona un paciente."),

  medicoId: z.string().min(1, "Selecciona un médico para la cita."),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato AAAA-MM-DD.")
    .refine((fecha) => {
      const [anio, mes, dia] = fecha.split("-").map(Number);
      const fechaIngresada = new Date(anio, mes - 1, dia);

      return (
        fechaIngresada.getFullYear() === anio &&
        fechaIngresada.getMonth() === mes - 1 &&
        fechaIngresada.getDate() === dia
      );
    }, "Introduce una fecha válida.")
    .refine(
      (fecha) => fecha >= fechaActual(),
      "La fecha de la cita no puede estar en el pasado.",
    ),

  hora: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "La hora debe estar entre 00:00 y 23:59.",
    ),

  motivo: z
    .string()
    .trim()
    .min(10, "Explica el motivo con al menos 10 caracteres.")
    .max(500, "El motivo no puede superar los 500 caracteres."),

  urgencia: z.enum(["baja", "media", "alta", "critica"]),
});

export type CitaFormData = z.infer<typeof citaSchema>;
