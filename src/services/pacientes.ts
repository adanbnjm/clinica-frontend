import { api } from "../lib/axios";
import type { RespuestaPaginada } from "../types/api";

export interface PacienteApi {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  ci: string;
  email: string;
  telefono: string | null;
  direccion: string | null;
  fechaNacimiento: string;
}

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

export const obtenerPacientes = (query = "", pagina = 1, limite = 10) =>
  api.get<RespuestaPaginada<PacienteApi>>("/pacientes", {
    params: {
      ...(query.trim() && { query: query.trim() }),
      pagina,
      limite,
    },
  });

export const create = (data: CrearPacienteDTO) =>
  api.post<PacienteRespuestaApi>("/pacientes", data);

export const update = (id: number, data: ActualizarPacienteDTO) =>
  api.put<PacienteRespuestaApi>(`/pacientes/${id}`, data);

export const remove = (id: number) => api.delete(`/pacientes/${id}`);
export const obtenerPacientePorId = (id: number) =>
  api.get<PacienteApi>(`/pacientes/${id}`);
