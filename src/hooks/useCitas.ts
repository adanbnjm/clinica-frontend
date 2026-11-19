import { useEffect } from "react";
import { useCitasStore } from "../stores/citasStore";

export function useCitas() {
  const citas = useCitasStore((s) => s.citas);
  const citaSeleccionada = useCitasStore((s) => s.citaSeleccionada);
  const cargando = useCitasStore((s) => s.cargando);
  const error = useCitasStore((s) => s.error);

  const cargar = useCitasStore((s) => s.cargar);
  const cargarPorPaciente = useCitasStore((s) => s.cargarPorPaciente);
  const seleccionar = useCitasStore((s) => s.seleccionar);
  const actualizarEstado = useCitasStore((s) => s.actualizarEstado);
  const agregarCita = useCitasStore((s) => s.agregarCita);

  useEffect(() => {
    void cargar().catch(() => {});
  }, [cargar]);

  return {
    citas,
    citaSeleccionada,
    cargando,
    error,
    cargar,
    cargarPorPaciente,
    seleccionar,
    actualizarEstado,
    agregarCita,
  };
}
