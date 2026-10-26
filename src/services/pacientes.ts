import { api } from "../lib/axios";

export interface CrearPacienteDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string | null;
  ci: string;
  email: string;
  fechaNacimiento: string;
  telefono?: string | null;
  direccion?: string | null;
}

export type ActualizarPacienteDTO = Partial<CrearPacienteDTO>;

interface PacienteRespuestaApi {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  ci: string;
  email: string;
  fechaNacimiento: string;
  telefono: string | null;
  direccion: string | null;
}

export const create = (data: CrearPacienteDTO) =>
  api.post<PacienteRespuestaApi>("/pacientes", data);

export const update = (id: number, data: ActualizarPacienteDTO) =>
  api.put<PacienteRespuestaApi>(`/pacientes/${id}`, data);

export const remove = (id: number) => api.delete(`/pacientes/${id}`);
