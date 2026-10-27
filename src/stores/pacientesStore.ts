import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Paciente, EstadoPaciente } from "../types/paciente";
import * as pacientesService from "../services/pacientes";
import type { PacienteApi } from "../services/pacientes";
import { useFiltrosStore } from "./filtrosStore";
interface DatosNuevoPaciente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ci: string;
  email: string;
  fechaNacimiento: string;
  telefono: string;
}

type DatosActualizarPaciente = Partial<
  Pick<
    Paciente,
    | "nombre"
    | "apellidoPaterno"
    | "apellidoMaterno"
    | "ci"
    | "email"
    | "fechaNacimiento"
    | "telefono"
    | "direccion"
    | "estado"
  >
>;

interface PacientesState {
  pacientes: Paciente[];
  total: number;
  pagina: number;
  totalPaginas: number;
  cargando: boolean;
  error: string;

  cargar: (query?: string, pagina?: number) => Promise<void>;
  cambiarPagina: (pagina: number) => Promise<void>;
  crear: (datos: DatosNuevoPaciente) => Promise<Paciente>;
  actualizar: (id: number, datos: DatosActualizarPaciente) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
}
export function adaptarPaciente(paciente: PacienteApi): Paciente {
  return {
    ...paciente,
    apellido: [paciente.apellidoPaterno, paciente.apellidoMaterno]
      .filter(Boolean)
      .join(" "),
    telefono: paciente.telefono ?? "",
    estado: "activo",
  };
}

function obtenerMensajeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

export const usePacientesStore = create<PacientesState>()(
  devtools(
    (set) => ({
      pacientes: [],
      total: 0,
      pagina: 1,
      totalPaginas: 0,
      cargando: false,
      error: "",

      cargar: async (query, pagina = 1) => {
        set({ cargando: true, error: "" }, false, "cargar/inicio");

        try {
          const respuesta = await pacientesService.obtenerPacientes(
            query,
            pagina,
            10,
          );

          set(
            {
              pacientes: respuesta.data.data.map(adaptarPaciente),
              total: respuesta.data.total,
              pagina: respuesta.data.pagina,
              totalPaginas: respuesta.data.totalPaginas,
              cargando: false,
            },
            false,
            "cargar/exito",
          );
        } catch (error: unknown) {
          set(
            {
              error: obtenerMensajeError(error),
              cargando: false,
            },
            false,
            "cargar/error",
          );
        }
      },

      cambiarPagina: async (pagina) => {
        const query = useFiltrosStore.getState().queryPacientes;
        await usePacientesStore.getState().cargar(query, pagina);
      },

      crear: async (datos) => {
        set({ error: "" }, false, "crear/inicio");

        try {
          const respuesta = await pacientesService.create({
            nombre: datos.nombre.trim(),
            apellidoPaterno: datos.apellidoPaterno.trim(),
            apellidoMaterno: datos.apellidoMaterno.trim() || undefined,
            ci: datos.ci.trim(),
            email: datos.email.trim(),
            fechaNacimiento: new Date(
              `${datos.fechaNacimiento}T12:00:00.000Z`,
            ).toISOString(),
            telefono: datos.telefono.trim() || undefined,
          });

          const nuevoPaciente = adaptarPaciente(respuesta.data);

          set(
            (state) => ({
              pacientes: [...state.pacientes, nuevoPaciente],
            }),
            false,
            "crear/exito",
          );
          return nuevoPaciente;
        } catch (error: unknown) {
          const mensaje = obtenerMensajeError(error);
          set({ error: mensaje }, false, "crear/error");
          throw error;
        }
      },

      actualizar: async (id, datos) => {
        set({ error: "" }, false, "actualizar/inicio");

        const {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          ci,
          email,
          fechaNacimiento,
          telefono,
          direccion,
        } = datos;

        const datosApi = {
          ...(nombre !== undefined && { nombre }),
          ...(apellidoPaterno !== undefined && { apellidoPaterno }),
          ...(apellidoMaterno !== undefined && { apellidoMaterno }),
          ...(ci !== undefined && { ci }),
          ...(email !== undefined && { email }),
          ...(fechaNacimiento !== undefined && {
            fechaNacimiento: new Date(
              `${fechaNacimiento}T12:00:00.000Z`,
            ).toISOString(),
          }),
          ...(telefono !== undefined && { telefono }),
          ...(direccion !== undefined && { direccion }),
        };

        try {
          if (Object.keys(datosApi).length > 0) {
            const respuesta = await pacientesService.update(id, datosApi);

            const pacienteActualizado = adaptarPaciente(respuesta.data);

            set(
              (state) => ({
                pacientes: state.pacientes.map((paciente) =>
                  paciente.id === id
                    ? {
                        ...pacienteActualizado,
                        estado: paciente.estado,
                      }
                    : paciente,
                ),
              }),
              false,
              "actualizar/exito",
            );
          }

          if (datos.estado !== undefined) {
            set(
              (state) => ({
                pacientes: state.pacientes.map((paciente) =>
                  paciente.id === id
                    ? { ...paciente, estado: datos.estado as EstadoPaciente }
                    : paciente,
                ),
              }),
              false,
              "actualizar/estadoLocal",
            );
          }
        } catch (error: unknown) {
          set({ error: obtenerMensajeError(error) }, false, "actualizar/error");
          throw error;
        }
      },

      eliminar: async (id) => {
        set({ error: "" }, false, "eliminar/inicio");

        try {
          await pacientesService.remove(id);

          set(
            (state) => ({
              pacientes: state.pacientes.filter(
                (paciente) => paciente.id !== id,
              ),
            }),
            false,
            "eliminar/exito",
          );
        } catch (error: unknown) {
          set({ error: obtenerMensajeError(error) }, false, "eliminar/error");
          throw error;
        }
      },
    }),
    { name: "PacientesStore" },
  ),
);
