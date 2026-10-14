import type { EstadoPaciente } from "../types/paciente";

interface BadgeEstadoProps {
  estado: EstadoPaciente;
}

const estilosPorEstado: Record<EstadoPaciente, string> = {
  activo: "bg-emerald-100 text-emerald-700",
  inactivo: "bg-rose-100 text-rose-700",
  en_espera: "bg-amber-100 text-amber-700",
};

const nombresPorEstado: Record<EstadoPaciente, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  en_espera: "En espera",
};

export default function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium " +
        estilosPorEstado[estado]
      }
    >
      {nombresPorEstado[estado]}
    </span>
  );
}
