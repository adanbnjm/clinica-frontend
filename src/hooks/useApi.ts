import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { extraerMensajeError } from "../lib/errorHandler";

interface EstadoApi<T> {
  data: T | null;
  cargando: boolean;
  error: string | null;
}

export function useApi<T>(url: string) {
  const [estado, setEstado] = useState<EstadoApi<T>>({
    data: null,
    cargando: true,
    error: null,
  });

  const [intento, setIntento] = useState(0);

  const recargar = useCallback(() => {
    setIntento((actual) => actual + 1);
  }, []);

  useEffect(() => {
    const controlador = new AbortController();

    const obtenerDatos = async () => {
      setEstado((actual) => ({
        ...actual,
        cargando: true,
        error: null,
      }));

      try {
        const respuesta = await api.get<T>(url, {
          signal: controlador.signal,
        });

        setEstado({
          data: respuesta.data,
          cargando: false,
          error: null,
        });
      } catch (err: unknown) {
        if (controlador.signal.aborted) {
          return;
        }

        setEstado((actual) => ({
          ...actual,
          cargando: false,
          error: extraerMensajeError(err),
        }));
      }
    };

    void obtenerDatos();

    return () => {
      controlador.abort();
    };
  }, [url, intento]);

  return {
    ...estado,
    recargar,
  };
}
