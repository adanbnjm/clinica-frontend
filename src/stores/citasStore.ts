import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../lib/axios";
import type { Cita, EstadoCita, NuevaCita } from "../types/cita";
import * as citasService from "../services/citas";

interface CitasState {
  citas: Cita[];
  citaSeleccionada: Cita | null;
  cargando: boolean;

  cargar: () => Promise<void>;
  cargarPorPaciente: (id: number) => Promise<void>;

  seleccionar: (id: number) => void;
  actualizarEstado: (id: number, estado: EstadoCita) => Promise<void>;
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
        const cita = get().citas.find((cita) => cita.id === id) ?? null;

        set({ citaSeleccionada: cita }, false, "seleccionar");
      },

      actualizarEstado: async (id, estado) => {
        const estadoAnterior = get().citas.find((cita) => cita.id === id);

        if (!estadoAnterior) {
          throw new Error("No se encontró la cita que deseas actualizar.");
        }

        const citaSeleccionadaAnterior = get().citaSeleccionada;

        // 1. Actualización optimista: cambia la interfaz inmediatamente.
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
          "actualizarEstado/optimista",
        );

        try {
          // 2. Guarda el cambio en el backend.
          const respuesta = await citasService.updateEstado(id, estado);

          // 3. Sincroniza con el registro confirmado por el servidor.
          set(
            (state) => ({
              citas: state.citas.map((cita) =>
                cita.id === id ? respuesta.data : cita,
              ),
              citaSeleccionada:
                state.citaSeleccionada?.id === id
                  ? respuesta.data
                  : state.citaSeleccionada,
            }),
            false,
            "actualizarEstado/exito",
          );
        } catch (error) {
          // 4. Si falla la petición, restaura el estado anterior.
          set(
            (state) => ({
              citas: state.citas.map((cita) =>
                cita.id === id ? estadoAnterior : cita,
              ),
              citaSeleccionada:
                citaSeleccionadaAnterior?.id === id
                  ? citaSeleccionadaAnterior
                  : state.citaSeleccionada,
            }),
            false,
            "actualizarEstado/revertir",
          );

          throw error;
        }
      },

      agregarCita: async (datos) => {
        const respuesta = await citasService.create(datos);
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
