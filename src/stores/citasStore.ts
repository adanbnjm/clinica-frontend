import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../lib/axios";
import type { Cita, EstadoCita, NuevaCita } from "../types/cita";
import * as citasService from "../services/citas";
import { extraerMensajeError } from "../lib/errorHandler";

interface CitasState {
  citas: Cita[];
  citaSeleccionada: Cita | null;
  cargando: boolean;
  error: string | null;

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
      error: null,

      cargar: async () => {
        set({ cargando: true, error: null }, false, "cargar/inicio");

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
        } catch (error: unknown) {
          set({ error: extraerMensajeError(error) }, false, "cargar/error");
          throw error;
        } finally {
          set({ cargando: false }, false, "cargar/fin");
        }
      },

      cargarPorPaciente: async (id) => {
        set({ cargando: true, error: null }, false, "cargarPorPaciente/inicio");

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
        } catch (error: unknown) {
          set(
            { error: extraerMensajeError(error) },
            false,
            "cargarPorPaciente/error",
          );
          throw error;
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

        set(
          (state) => ({
            error: null,
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
          const respuesta = await citasService.updateEstado(id, estado);

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
        } catch (error: unknown) {
          set(
            (state) => ({
              error: extraerMensajeError(error),
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
        set({ error: null }, false, "agregarCita/inicio");

        try {
          const respuesta = await citasService.create(datos);
          const nuevaCita = respuesta.data;

          set(
            (state) => ({
              citas: [...state.citas, nuevaCita],
            }),
            false,
            "agregarCita/exito",
          );

          return nuevaCita;
        } catch (error: unknown) {
          set(
            { error: extraerMensajeError(error) },
            false,
            "agregarCita/error",
          );
          throw error;
        }
      },
    }),
    { name: "CitasStore" },
  ),
);
