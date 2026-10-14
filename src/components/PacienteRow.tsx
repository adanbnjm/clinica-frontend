import type { Paciente } from "../types/paciente";
import BadgeEstado from "./BadgeEstado";

interface PacienteRowProps {
  paciente: Paciente;
}

export default function PacienteRow({ paciente }: PacienteRowProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-slate-900">
          {paciente.nombre} {paciente.apellido}
        </h3>

        <p className="text-sm text-slate-500">{paciente.email}</p>
        <p className="text-sm text-slate-500">{paciente.telefono}</p>
      </div>

      <div className="flex flex-col gap-2 sm:items-end">
        <span className="text-sm text-slate-700">
          {paciente.especialidadAsignada}
        </span>

        <span className="text-sm text-slate-500">
          Última cita: {paciente.ultimaCita}
        </span>

        <BadgeEstado estado={paciente.estado} />
      </div>
    </article>
  );
}
