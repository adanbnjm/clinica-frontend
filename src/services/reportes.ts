import { api } from "../lib/axios";

export interface CitasPorEspecialidad {
  especialidad: string;
  total: number;
}

export async function obtenerCitasPorEspecialidad(): Promise<
  CitasPorEspecialidad[]
> {
  const respuesta = await api.get<CitasPorEspecialidad[]>(
    "/reportes/especialidades",
  );

  return respuesta.data;
}
