import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePacientesStore } from "../stores/pacientesStore";
import PaginaNotFound from "./PaginaNotFound";

export default function PaginaDetallePaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pacientes = usePacientesStore((s) => s.pacientes);
  const cargar = usePacientesStore((s) => s.cargar);
  const cargando = usePacientesStore((s) => s.cargando);
  const error = usePacientesStore((s) => s.error);

  useEffect(() => {
    if (pacientes.length === 0) {
      void cargar();
    }
  }, [pacientes.length, cargar]);

  const paciente = pacientes.find((paciente) => paciente.id === Number(id));

  if (cargando && !paciente) {
    return (
      <main className="p-8 text-center">Cargando datos del paciente...</main>
    );
  }

  if (error && !paciente) {
    return (
      <main className="p-8 text-center">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => void cargar()}
          className="mt-4 rounded-lg border px-4 py-2"
        >
          Reintentar
        </button>
      </main>
    );
  }

  if (!paciente) {
    return <PaginaNotFound />;
  }
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          ← Volver
        </button>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Ficha del paciente
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                {paciente.nombre} {paciente.apellido}
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Código: {paciente.id}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                paciente.estado === "activo"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : paciente.estado === "en_espera"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            >
              {paciente.estado === "en_espera"
                ? "En espera"
                : paciente.estado === "activo"
                  ? "Activo"
                  : "Inactivo"}
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                Correo electrónico
              </p>
              <p className="mt-1 font-medium">{paciente.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                Teléfono
              </p>
              <p className="mt-1 font-medium">
                {paciente.telefono || "No registrado"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                Especialidad asignada
              </p>
              <p className="mt-1 font-medium">
                {paciente.especialidadAsignada}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                Última cita
              </p>
              <p className="mt-1 font-medium">
                {paciente.ultimaCita || "Sin citas registradas"}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-neutral-800">
            <Link
              to="/pacientes"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Ver lista de pacientes →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
