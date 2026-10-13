import { useState } from "react";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import type { Metrica } from "../types";

export default function PaginaDashboard() {
  const [pacientes, setPacientes] = useState(128);
  const [mantenimiento, setMantenimiento] = useState(false);

  const metricas: Metrica[] = [
    {
      id: "pacientes",
      titulo: "Pacientes",
      valor: pacientes,
      descripcion: "Pacientes registrados",
      tendencia: "positiva",
      icono: "👥",
    },
    {
      id: "citas",
      titulo: "Citas Hoy",
      valor: 12,
      descripcion: "Citas programadas para hoy",
      tendencia: "positiva",
      icono: "📅",
    },
    {
      id: "consultas",
      titulo: "Consultas Pendientes",
      valor: 5,
      descripcion: "Consultas por atender",
      tendencia: "negativa",
      icono: "⏳",
    },
    {
      id: "disponibilidad",
      titulo: "Disponibilidad",
      valor: "95%",
      descripcion: "Disponibilidad del sistema",
      tendencia: "neutra",
      icono: "🏥",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
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

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
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

        <section
          aria-label="Métricas de la clínica"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metricas.map((metrica) => (
            <MetricCard key={metrica.id} metrica={metrica} />
          ))}
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Gestión de pacientes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Utiliza los botones para modificar el contador de pacientes.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setPacientes((cantidad) => Math.max(0, cantidad - 1))
              }
              disabled={pacientes === 0}
              aria-label="Disminuir pacientes"
              className="rounded-lg border border-slate-300 px-4 py-2 text-xl font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-16 text-center text-2xl font-bold text-slate-900">
              {pacientes}
            </span>

            <button
              type="button"
              onClick={() => setPacientes((cantidad) => cantidad + 1)}
              aria-label="Aumentar pacientes"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xl font-semibold text-white hover:bg-emerald-700"
            >
              +
            </button>
          </div>
        </section>

        <footer className="mt-8 text-center text-sm text-slate-400">
          Clínica Salud Integral
        </footer>
      </div>
    </main>
  );
}
