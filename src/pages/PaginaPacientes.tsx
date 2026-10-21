import { useState } from "react";
import type * as React from "react";
import type { EstadoPaciente } from "../types/paciente";
import BuscadorPacientes from "../components/BuscadorPacientes";
import PacienteRow from "../components/PacienteRow";
import { usePacientes } from "../hooks/usePacientes";
import { Link } from "react-router-dom";

export default function PaginaPacientes() {
  const {
    pacientesFiltrados,
    busqueda,
    setBusqueda,
    estadoFiltro,
    setEstadoFiltro,
    limpiarFiltros,
    agregarPaciente,
    cambiarEstadoPaciente,
    eliminarPaciente,
  } = usePacientes();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPaciente>("activo");
  const [errorFormulario, setErrorFormulario] = useState("");

  const manejarEnvioFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      setErrorFormulario("El nombre y el email son obligatorios.");
      return;
    }

    agregarPaciente({
      nombre,
      apellido,
      email,
      estado: nuevoEstado,
    });

    setNombre("");
    setApellido("");
    setEmail("");
    setNuevoEstado("activo");
    setErrorFormulario("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Clínica Salud Integral
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
            Pacientes
          </h1>

          <p className="mt-2 text-slate-600 dark:text-neutral-400">
            Consulta, registra y administra los pacientes de la clínica.
          </p>
        </header>

        {/* Filtros y búsqueda */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Lista de pacientes</h2>

            <p className="text-sm text-slate-500 dark:text-neutral-400">
              {pacientesFiltrados.length}{" "}
              {pacientesFiltrados.length === 1
                ? "paciente encontrado"
                : "pacientes encontrados"}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <BuscadorPacientes value={busqueda} onChange={setBusqueda} />
            </div>

            <div className="w-full sm:w-56">
              <label
                htmlFor="filtro-estado"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-neutral-200"
              >
                Filtrar por estado
              </label>

              <select
                id="filtro-estado"
                value={estadoFiltro}
                onChange={(evento) =>
                  setEstadoFiltro(
                    evento.currentTarget.value as "Todos" | EstadoPaciente,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
              >
                <option value="Todos">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="en_espera">En espera</option>
              </select>
            </div>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              Limpiar filtros
            </button>
          </div>
        </section>

        {/* Formulario de registro */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="mb-4 text-lg font-semibold">Registrar paciente</h2>

          <form
            onSubmit={manejarEnvioFormulario}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="nombre"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
              >
                Nombre *
              </label>

              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(evento) => {
                  setNombre(evento.currentTarget.value);
                  setErrorFormulario("");
                }}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
              >
                Apellido
              </label>

              <input
                id="apellido"
                type="text"
                value={apellido}
                onChange={(evento) => setApellido(evento.currentTarget.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
              >
                Email *
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(evento) => {
                  setEmail(evento.currentTarget.value);
                  setErrorFormulario("");
                }}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
              />
            </div>

            <div>
              <label
                htmlFor="nuevo-estado"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
              >
                Estado inicial
              </label>

              <select
                id="nuevo-estado"
                value={nuevoEstado}
                onChange={(evento) =>
                  setNuevoEstado(evento.currentTarget.value as EstadoPaciente)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="en_espera">En espera</option>
              </select>
            </div>

            {errorFormulario && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 sm:col-span-2"
              >
                {errorFormulario}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
              >
                Agregar paciente
              </button>
            </div>
          </form>
        </section>

        {/* Lista y acciones de los pacientes */}
        <section
          aria-label="Resultados de pacientes"
          className="flex flex-col gap-4"
        >
          {pacientesFiltrados.length > 0 ? (
            pacientesFiltrados.map((paciente) => (
              <article key={paciente.id} className="rounded-xl">
                <PacienteRow paciente={paciente} />
                <Link
                  to={`/pacientes/${paciente.id}`}
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-neutral-900"
                >
                  Ver detalle →
                </Link>

                <div className="mt-2 flex flex-wrap items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
                  <label
                    htmlFor={`estado-paciente-${paciente.id}`}
                    className="text-sm text-slate-600 dark:text-neutral-300"
                  >
                    Cambiar estado:
                  </label>

                  <select
                    id={`estado-paciente-${paciente.id}`}
                    value={paciente.estado}
                    onChange={(evento) =>
                      cambiarEstadoPaciente(
                        paciente.id,
                        evento.currentTarget.value as EstadoPaciente,
                      )
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="en_espera">En espera</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => eliminarPaciente(paciente.id)}
                    className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center transition-colors dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="font-semibold text-slate-800 dark:text-neutral-100">
                No se encontraron pacientes
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Prueba con otra búsqueda o cambia el estado seleccionado.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
