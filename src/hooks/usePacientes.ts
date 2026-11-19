import { useEffect } from "react";
import { usePacientesStore } from "../stores/pacientesStore";

export function usePacientes(query?: string) {
  const pacientes = usePacientesStore((s) => s.pacientes);
  const total = usePacientesStore((s) => s.total);
  const pagina = usePacientesStore((s) => s.pagina);
  const totalPaginas = usePacientesStore((s) => s.totalPaginas);
  const cargando = usePacientesStore((s) => s.cargando);
  const error = usePacientesStore((s) => s.error);

  const cargar = usePacientesStore((s) => s.cargar);
  const cambiarPagina = usePacientesStore((s) => s.cambiarPagina);
  const crear = usePacientesStore((s) => s.crear);
  const actualizar = usePacientesStore((s) => s.actualizar);
  const eliminar = usePacientesStore((s) => s.eliminar);

  useEffect(() => {
    void cargar(query);
  }, [cargar, query]);

  return {
    pacientes,
    total,
    pagina,
    totalPaginas,
    cargando,
    error,
    cargar,
    cambiarPagina,
    crear,
    actualizar,
    eliminar,
  };
}
