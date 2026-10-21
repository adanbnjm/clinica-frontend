import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import type { Metrica } from "../types";
import { api } from "../lib/axios";

interface PacienteApi {
  id: number;
}

interface MedicoApi {
  id: number;
}

interface CitaApi {
  id: number;
  estado: "PROGRAMADA" | "COMPLETADA" | "CANCELADA";
  fechaHora: string;
}

export default function PaginaDashboard() {
  const [mantenimiento, setMantenimiento] = useState(false);
  const [totalPacientes, setTotalPacientes] = useState<number | null>(null);
  const [totalMedicos, setTotalMedicos] = useState<number | null>(null);
  const [citasProgramadas, setCitasProgramadas] = useState<number | null>(null);
  const [completadasHoy, setCompletadasHoy] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarMetricas = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const [respuestaPacientes, respuestaMedicos, respuestaCitas] =
        await Promise.all([
          api.get<PacienteApi[]>("/pacientes"),
          api.get<MedicoApi[]>("/medicos"),
          api.get<CitaApi[]>("/citas"),
        ]);

      const citas = respuestaCitas.data;
      const hoy = new Date();

      const programadas = citas.filter(
        (cita) => cita.estado === "PROGRAMADA",
      ).length;

      const completadas = citas.filter((cita) => {
        const fechaCita = new Date(cita.fechaHora);

        return (
          cita.estado === "COMPLETADA" &&
          fechaCita.getFullYear() === hoy.getFullYear() &&
          fechaCita.getMonth() === hoy.getMonth() &&
          fechaCita.getDate() === hoy.getDate()
        );
      }).length;

      setTotalPacientes(respuestaPacientes.data.length);
      setTotalMedicos(respuestaMedicos.data.length);
      setCitasProgramadas(programadas);
      setCompletadasHoy(completadas);
    } catch {
      setError(
        "No se pudieron cargar las métricas. Comprueba tu sesión y que el backend esté funcionando.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarMetricas();
  }, [cargarMetricas]);

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
              onClick={() => void cargarMetricas()}
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

        <footer className="mt-8 text-center text-sm text-slate-400">
          Clínica Salud Integral
        </footer>
      </div>
    </main>
  );
}
