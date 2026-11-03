import { api } from "../lib/axios";
import type { Cita, EstadoCita, NuevaCita } from "../types/cita";
import type { RespuestaPaginada } from "../types/api";

export const create = (data: NuevaCita) => api.post<Cita>("/citas", data);

export const updateEstado = (id: number, estado: EstadoCita) =>
  api.patch<Cita>(`/citas/${id}/estado`, { estado });
export const getPaginadas = (
  pagina: number,
  porPagina: number,
  estado?: EstadoCita,
  signal?: AbortSignal,
) =>
  api.get<RespuestaPaginada<Cita>>("/citas/historial", {
    params: {
      pagina,
      porPagina,
      ...(estado && { estado }),
    },
    signal,
  });
