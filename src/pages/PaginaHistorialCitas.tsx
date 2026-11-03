import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getPaginadas } from "../services/citas";
import { extraerMensajeError } from "../lib/errorHandler";
import type { Cita, EstadoCita } from "../types/cita";

const POR_PAGINA = 10;

const estados: { valor: string; etiqueta: string }[] = [
  { valor: "Todos", etiqueta: "Todos" },
  { valor: "PROGRAMADA", etiqueta: "Programada" },
  { valor: "COMPLETADA", etiqueta: "Completada" },
  { valor: "CANCELADA", etiqueta: "Cancelada" },
];

const estilosEstado: Record<EstadoCita, string> = {
  PROGRAMADA: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  COMPLETADA:
    "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  CANCELADA: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

export default function PaginaHistorialCitas() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagina = Math.max(1, Number(searchParams.get("pagina")) || 1);
  const estado = searchParams.get("estado") ?? "Todos";

  const [citas, setCitas] = useState<Cita[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarHistorial() {
      setCargando(true);
      setErrorCarga("");

      try {
        const estadoFiltro =
          estado === "Todos" ? undefined : (estado as EstadoCita);

        const respuesta = await getPaginadas(
          pagina,
          POR_PAGINA,
          estadoFiltro,
          controller.signal,
        );

        setCitas(respuesta.data.data);
        setTotal(respuesta.data.total);
        setTotalPaginas(respuesta.data.totalPaginas);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        const mensaje = extraerMensajeError(error);
        setErrorCarga(mensaje);
        toast.error(mensaje);
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    void cargarHistorial();

    return () => controller.abort();
  }, [pagina, estado]);

  function cambiarPagina(nuevaPagina: number) {
    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set("pagina", String(nuevaPagina));
    setSearchParams(nuevosParametros);
  }

  function cambiarEstado(nuevoEstado: string) {
    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set("pagina", "1");

    if (nuevoEstado === "Todos") {
      nuevosParametros.delete("estado");
    } else {
      nuevosParametros.set("estado", nuevoEstado);
    }

    setSearchParams(nuevosParametros);
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Historial de citas
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Consulta las citas registradas y filtra por estado.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Estado:
          <select
            value={estado}
            onChange={(event) => cambiarEstado(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {estados.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorCarga && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {errorCarga}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">Cita</th>
              <th className="px-4 py-3">Paciente</th>
              <th className="px-4 py-3">Médico</th>
              <th className="px-4 py-3">Fecha y hora</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {cargando ? (
              Array.from({ length: POR_PAGINA }, (_, indice) => (
                <tr key={indice} className="animate-pulse">
                  {Array.from({ length: 5 }, (_, columna) => (
                    <td key={columna} className="px-4 py-4">
                      <div className="h-5 rounded bg-gray-200 dark:bg-gray-700" />
                    </td>
                  ))}
                </tr>
              ))
            ) : citas.length > 0 ? (
              citas.map((cita) => (
                <tr key={cita.id} className="text-gray-700 dark:text-gray-300">
                  <td className="px-4 py-3 font-medium">#{cita.id}</td>
                  <td className="px-4 py-3">#{cita.pacienteId}</td>
                  <td className="px-4 py-3">#{cita.medicoId}</td>
                  <td className="px-4 py-3">
                    {new Date(cita.fechaHora).toLocaleString("es-BO")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilosEstado[cita.estado]}`}
                    >
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No hay citas para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Página {pagina} de {totalPaginas} — {total} registros
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={pagina <= 1 || cargando}
            onClick={() => cambiarPagina(pagina - 1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-200"
          >
            Anterior
          </button>

          <button
            type="button"
            disabled={pagina >= totalPaginas || cargando || totalPaginas === 0}
            onClick={() => cambiarPagina(pagina + 1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-200"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
