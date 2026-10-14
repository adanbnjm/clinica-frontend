import type { EstadoPaciente } from "../types/paciente";

interface BadgeEstadoProps {
  estado: EstadoPaciente;
}

const estilosPorEstado: Record<EstadoPaciente, string> = {
  activo: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  inactivo: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  en_espera:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
};

const nombresPorEstado: Record<EstadoPaciente, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  en_espera: "En espera",
};

export default function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${estilosPorEstado[estado]}`}
    >
      {nombresPorEstado[estado]}
    </span>
  );
}
