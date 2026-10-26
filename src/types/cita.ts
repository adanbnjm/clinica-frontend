export type EstadoCita = "PROGRAMADA" | "COMPLETADA" | "CANCELADA";

export interface Cita {
  id: number;
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  estado: EstadoCita;
}

export type NuevaCita = Pick<Cita, "pacienteId" | "medicoId" | "fechaHora"> & {
  estado?: EstadoCita;
};
