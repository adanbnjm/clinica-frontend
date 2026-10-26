import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../lib/axios";
import type { Cita, EstadoCita, NuevaCita } from "../types/cita";

interface CitasState {
  citas: Cita[];
  citaSeleccionada: Cita | null;
  cargando: boolean;

  cargar: () => Promise<void>;
  cargarPorPaciente: (id: number) => Promise<void>;

  seleccionar: (id: number) => void;
  actualizarEstado: (id: number, estado: EstadoCita) => void;
  agregarCita: (datos: NuevaCita) => Promise<Cita>;
}

export const useCitasStore = create<CitasState>()(
  devtools(
    (set, get) => ({
      citas: [],
      citaSeleccionada: null,
      cargando: false,
      cargar: async () => {
        set({ cargando: true }, false, "cargar/inicio");

        try {
          const respuesta = await api.get<Cita[]>("/citas");

          set(
            {
              citas: respuesta.data,
              citaSeleccionada: null,
            },
            false,
            "cargar/exito",
          );
        } finally {
          set({ cargando: false }, false, "cargar/fin");
        }
      },

      cargarPorPaciente: async (id) => {
        set({ cargando: true }, false, "cargarPorPaciente/inicio");

        try {
          // El backend aún no tiene una ruta para filtrar por paciente.
          // Descargamos las citas y filtramos en el frontend.
          const respuesta = await api.get<Cita[]>("/citas");

          const citasPaciente = respuesta.data.filter(
            (cita) => cita.pacienteId === id,
          );

          set(
            {
              citas: citasPaciente,
              citaSeleccionada: null,
            },
            false,
            "cargarPorPaciente/exito",
          );
        } finally {
          set({ cargando: false }, false, "cargarPorPaciente/fin");
        }
      },

      seleccionar: (id) => {
        const cita = get().citas.find((c) => c.id === id) ?? null;

        set({ citaSeleccionada: cita }, false, "seleccionar");
      },

      actualizarEstado: (id, estado) => {
        // Actualización local temporal: el backend aún no tiene PUT/PATCH.
        set(
          (state) => ({
            citas: state.citas.map((cita) =>
              cita.id === id ? { ...cita, estado } : cita,
            ),
            citaSeleccionada:
              state.citaSeleccionada?.id === id
                ? { ...state.citaSeleccionada, estado }
                : state.citaSeleccionada,
          }),
          false,
          "actualizarEstado/local",
        );
      },

      agregarCita: async (datos) => {
        const respuesta = await api.post<Cita>("/citas", datos);
        const nuevaCita = respuesta.data;

        set(
          (state) => ({
            citas: [...state.citas, nuevaCita],
          }),
          false,
          "agregarCita",
        );

        return nuevaCita;
      },
    }),
    { name: "CitasStore" },
  ),
);
