import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { EstadoCita } from "../types/cita";
import type { EstadoPaciente } from "../types/paciente";

interface FiltrosState {
  queryPacientes: string;
  especialidadFiltro: string;
  estadoCitaFiltro: EstadoCita | "Todos";
  estadoPacienteFiltro: "Todos" | EstadoPaciente;

  setQueryPacientes: (query: string) => void;
  setEspecialidad: (especialidad: string) => void;
  setEstadoCita: (estado: EstadoCita | "Todos") => void;
  setEstadoPacienteFiltro: (estado: "Todos" | EstadoPaciente) => void;
  resetFiltros: () => void;
}

export const useFiltrosStore = create<FiltrosState>()(
  devtools(
    (set) => ({
      queryPacientes: "",
      especialidadFiltro: "Todas",
      estadoCitaFiltro: "Todos",
      estadoPacienteFiltro: "Todos",

      setQueryPacientes: (query) => set({ queryPacientes: query }),

      setEspecialidad: (especialidad) =>
        set({ especialidadFiltro: especialidad }),

      setEstadoCita: (estado) => set({ estadoCitaFiltro: estado }),

      setEstadoPacienteFiltro: (estado) =>
        set({ estadoPacienteFiltro: estado }),

      resetFiltros: () =>
        set({
          queryPacientes: "",
          especialidadFiltro: "Todas",
          estadoCitaFiltro: "Todos",
          estadoPacienteFiltro: "Todos",
        }),
    }),
    { name: "FiltrosStore" },
  ),
);
