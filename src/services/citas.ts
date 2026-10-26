import { api } from "../lib/axios";
import type { Cita, EstadoCita, NuevaCita } from "../types/cita";

export const create = (data: NuevaCita) => api.post<Cita>("/citas", data);

export const updateEstado = (id: number, estado: EstadoCita) =>
  api.patch<Cita>(`/citas/${id}/estado`, { estado });
