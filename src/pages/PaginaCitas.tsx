import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCitasStore } from "../stores/citasStore";
import { extraerMensajeError } from "../lib/errorHandler";
import type { EstadoCita } from "../types/cita";

const estados: EstadoCita[] = ["PROGRAMADA", "COMPLETADA", "CANCELADA"];

const estilosEstado: Record<EstadoCita, string> = {
  PROGRAMADA: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  COMPLETADA:
    "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  CANCELADA: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

export default function PaginaCitas() {
  const citas = useCitasStore((state) => state.citas);
  const cargar = useCitasStore((state) => state.cargar);
  const cargando = useCitasStore((state) => state.cargando);
  const actualizarEstado = useCitasStore((state) => state.actualizarEstado);

  const [actualizandoId, setActualizandoId] = useState<number | null>(null);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    let activa = true;

    cargar()
      .then(() => {
        if (activa) setErrorCarga("");
      })
      .catch((error: unknown) => {
        if (activa) setErrorCarga(extraerMensajeError(error));
      });

    return () => {
      activa = false;
    };
  }, [cargar]);

  async function manejarCambioEstado(id: number, estado: EstadoCita) {
    setActualizandoId(id);

    try {
      await actualizarEstado(id, estado);
      toast.success("Estado de la cita actualizado.");
    } catch (error: unknown) {
      toast.error(extraerMensajeError(error));
    } finally {
      setActualizandoId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de citas
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Consulta las citas y actualiza su estado.
        </p>
      </div>

      {errorCarga && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          <p>{errorCarga}</p>
          <button
            type="button"
            onClick={() => {
              setErrorCarga("");
              cargar().catch((error: unknown) => {
                setErrorCarga(extraerMensajeError(error));
              });
            }}
            className="mt-2 font-semibold underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {cargando && citas.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Cargando citas...</p>
      ) : !errorCarga && citas.length === 0 ? (
        <div className="rounded-xl border border-gray-200 p-8 text-center dark:border-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-200">
            No hay citas registradas.
          </p>
        </div>
      ) : (
        citas.length > 0 && (
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
                {citas.map((cita) => (
                  <tr
                    key={cita.id}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <td className="px-4 py-3 font-medium">#{cita.id}</td>

                    <td className="px-4 py-3">#{cita.pacienteId}</td>

                    <td className="px-4 py-3">#{cita.medicoId}</td>

                    <td className="px-4 py-3">
                      {new Date(cita.fechaHora).toLocaleString("es-BO")}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilosEstado[cita.estado]}`}
                        >
                          {cita.estado}
                        </span>

                        <select
                          aria-label={`Cambiar estado de la cita ${cita.id}`}
                          value={cita.estado}
                          disabled={actualizandoId === cita.id}
                          onChange={(event) => {
                            const nuevoEstado = event.target
                              .value as EstadoCita;

                            if (nuevoEstado !== cita.estado) {
                              void manejarCambioEstado(cita.id, nuevoEstado);
                            }
                          }}
                          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-800 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                          {estados.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </select>

                        {actualizandoId === cita.id && (
                          <span className="text-xs text-gray-500">
                            Guardando...
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </section>
  );
}
