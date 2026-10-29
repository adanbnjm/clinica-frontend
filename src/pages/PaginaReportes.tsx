import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../lib/axios";
import {
  obtenerCitasPorEspecialidad,
  type CitasPorEspecialidad,
} from "../services/reportes";
import type { Cita } from "../types/cita";
import { extraerMensajeError } from "../lib/errorHandler";

interface CitasPorDia {
  fecha: string;
  total: number;
}

export default function PaginaReportes() {
  const [especialidades, setEspecialidades] = useState<CitasPorEspecialidad[]>(
    [],
  );
  const [citasPorDia, setCitasPorDia] = useState<CitasPorDia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarReportes() {
      try {
        setCargando(true);
        setError("");

        const [datosEspecialidades, respuestaCitas] = await Promise.all([
          obtenerCitasPorEspecialidad(),
          api.get<Cita[]>("/citas"),
        ]);

        setEspecialidades(datosEspecialidades);

        const citas = respuestaCitas.data;
        const hoy = new Date();
        const datosDiarios: CitasPorDia[] = [];

        for (let desplazamiento = 6; desplazamiento >= 0; desplazamiento--) {
          const fecha = new Date(hoy);
          fecha.setDate(hoy.getDate() - desplazamiento);

          const inicioDia = new Date(fecha);
          inicioDia.setHours(0, 0, 0, 0);

          const finDia = new Date(fecha);
          finDia.setHours(23, 59, 59, 999);

          const total = citas.filter((cita) => {
            const fechaCita = new Date(cita.fechaHora);
            return fechaCita >= inicioDia && fechaCita <= finDia;
          }).length;

          datosDiarios.push({
            fecha: fecha.toLocaleDateString("es-BO", {
              day: "2-digit",
              month: "2-digit",
            }),
            total,
          });
        }

        setCitasPorDia(datosDiarios);
      } catch (err: unknown) {
        setError(extraerMensajeError(err));
      } finally {
        setCargando(false);
      }
    }

    void cargarReportes();
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Reportes</h1>
        <p className="mt-2 text-slate-600 dark:text-neutral-400">
          Resumen de citas por especialidad y por día.
        </p>
      </header>

      {cargando ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-96 animate-pulse rounded-xl bg-slate-200 dark:bg-neutral-800" />
          <div className="h-96 animate-pulse rounded-xl bg-slate-200 dark:bg-neutral-800" />
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-300 p-5 text-red-700 dark:border-red-900 dark:text-red-300"
        >
          No se pudieron cargar los reportes: {error}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-5 text-lg font-semibold">
              Citas por especialidad
            </h2>

            {especialidades.length === 0 ? (
              <p className="py-12 text-center text-slate-500">
                No hay datos de especialidades para mostrar.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={especialidades}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="especialidad" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" name="Citas" fill="#059669">
                    {especialidades.map((dato) => (
                      <Cell key={dato.especialidad} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-5 text-lg font-semibold">
              Citas por día (últimos 7 días)
            </h2>

            {citasPorDia.every((dato) => dato.total === 0) ? (
              <p className="py-12 text-center text-slate-500">
                No hay citas registradas en los últimos 7 días.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={citasPorDia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Citas"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
