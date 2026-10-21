export type EstadoPaciente = "activo" | "inactivo" | "en_espera";

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidadAsignada?: string;
  ultimaCita?: string;
  estado?: EstadoPaciente;
  ci: string;
  apellidoPaterno: string;
  apellidoMaterno?: string | null;
  direccion?: string | null;
  fechaNacimiento: string;
}
