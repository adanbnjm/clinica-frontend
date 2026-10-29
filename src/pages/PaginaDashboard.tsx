import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import type { Metrica } from "../types";
import { api } from "../lib/axios";
import { usePacientesStore } from "../stores/pacientesStore";
import { useCitasStore } from "../stores/citasStore";
import { extraerMensajeError } from "../lib/errorHandler";

interface MedicoApi {
  id: number;
}

export default function PaginaDashboard() {
  const [mantenimiento, setMantenimiento] = useState(false);
  const [totalMedicos, setTotalMedicos] = useState<number | null>(null);
  const [cargandoMedicos, setCargandoMedicos] = useState(true);
  const [errorMedicos, setErrorMedicos] = useState("");

  const pacientes = usePacientesStore((s) => s.pacientes);
  const cargarPacientes = usePacientesStore((s) => s.cargar);
  const cargandoPacientes = usePacientesStore((s) => s.cargando);
  const errorPacientes = usePacientesStore((s) => s.error);

  const citas = useCitasStore((s) => s.citas);
  const cargarTodasLasCitas = useCitasStore((s) => s.cargar);
  const cargandoCitas = useCitasStore((s) => s.cargando);

  const cargarMedicos = async () => {
    setCargandoMedicos(true);
    setErrorMedicos("");

    try {
      const respuesta = await api.get<MedicoApi[]>("/medicos");
      setTotalMedicos(respuesta.data.length);
    } catch (err: unknown) {
      setErrorMedicos(extraerMensajeError(err));
    } finally {
      setCargandoMedicos(false);
    }
  };

  useEffect(() => {
    if (pacientes.length === 0) {
      void cargarPacientes();
    }

    if (citas.length === 0) {
      void cargarTodasLasCitas();
    }

    void cargarMedicos();
  }, [pacientes.length, citas.length, cargarPacientes, cargarTodasLasCitas]);

  const cargando = cargandoPacientes || cargandoCitas || cargandoMedicos;

  const error = errorPacientes || errorMedicos;

  const totalPacientes = pacientes.length;

  const citasProgramadas = citas.filter(
    (cita) => cita.estado === "PROGRAMADA",
  ).length;

  const completadasHoy = citas.filter((cita) => {
    const fechaCita = new Date(cita.fechaHora);
    const hoy = new Date();

    return (
      cita.estado === "COMPLETADA" &&
      fechaCita.getFullYear() === hoy.getFullYear() &&
      fechaCita.getMonth() === hoy.getMonth() &&
      fechaCita.getDate() === hoy.getDate()
    );
  }).length;

  const metricas: Metrica[] = [
    {
      id: "pacientes",
      titulo: "Pacientes",
      valor: totalPacientes ?? "—",
      descripcion: "Pacientes registrados",
      tendencia: "positiva",
      icono: "👥",
    },
    {
      id: "medicos",
      titulo: "Médicos",
      valor: totalMedicos ?? "—",
      descripcion: "Médicos registrados",
      tendencia: "positiva",
      icono: "🩺",
    },
    {
      id: "citas-programadas",
      titulo: "Citas Programadas",
      valor: citasProgramadas ?? "—",
      descripcion: "Citas pendientes de atención",
      tendencia: "neutra",
      icono: "📅",
    },
    {
      id: "completadas-hoy",
      titulo: "Completadas Hoy",
      valor: completadasHoy ?? "—",
      descripcion: "Citas completadas en el día",
      tendencia: "positiva",
      icono: "✅",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-black px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {mantenimiento && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700"
          >
            <p className="font-semibold">
              ⚠️ La clínica está en modo mantenimiento.
            </p>
          </div>
        )}

        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-emerald-700">
              CLÍNICA SALUD INTEGRAL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-neutral-100">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500 dark:text-neutral-400">
              Resumen general de la clínica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge activo={!mantenimiento} />

            <button
              type="button"
              onClick={() => setMantenimiento((estado) => !estado)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {mantenimiento
                ? "Desactivar mantenimiento"
                : "Activar mantenimiento"}
            </button>
          </div>
        </header>

        {cargando && (
          <p role="status" className="mb-4 text-sm text-slate-600">
            Cargando métricas...
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={() => {
                void cargarPacientes();
                void cargarTodasLasCitas();
                void cargarMedicos();
              }}
              className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
            >
              Reintentar
            </button>
          </div>
        )}

        <section
          aria-label="Métricas de la clínica"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metricas.map((metrica) => (
            <MetricCard key={metrica.id} metrica={metrica} />
          ))}
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-neutral-100">
            Gestión de pacientes
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
            Consulta los pacientes registrados en la clínica.
          </p>

          <Link
            to="/pacientes"
            className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Ver pacientes
          </Link>
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-neutral-100">
            Reportes de la clínica
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
            Consulta las estadísticas de citas por especialidad y por día.
          </p>

          <Link
            to="/reportes"
            className="mt-4 inline-flex items-center font-semibold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Ver reportes completos →
          </Link>
        </section>

        <footer className="mt-8 text-center text-sm text-slate-400">
          Clínica Salud Integral
        </footer>
      </div>
    </main>
  );
}
