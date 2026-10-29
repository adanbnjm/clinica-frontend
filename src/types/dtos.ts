import type { PacienteApi } from "../services/pacientes";

export type CrearPacienteDTO = Omit<
  PacienteApi,
  "id" | "apellidoMaterno" | "telefono" | "direccion"
> & {
  apellidoMaterno?: string | null;
  telefono?: string | null;
  direccion?: string | null;
};
export type ActualizarPacienteDTO = Partial<Omit<PacienteApi, "id">>;

export type ResumenPaciente = Pick<
  PacienteApi,
  "id" | "nombre" | "apellidoPaterno" | "email"
>;
