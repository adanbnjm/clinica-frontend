import { useState } from "react";
import type { Paciente } from "../types/paciente";
import BuscadorPacientes from "../components/BuscadorPacientes";
import PacienteRow from "../components/PacienteRow";

// Problemas encontrados en el código generado por la IA:
// 1. Los datos de los pacientes estaban escritos directamente en el HTML y duplicados para escritorio y móvil.
// 2. La interfaz y la lógica de búsqueda y filtros estaban concentradas en un solo documento, dificultando su mantenimiento.
// 3. Las etiquetas de estado se repetían en el HTML, en lugar de utilizar un componente reutilizable.
//
// Refactorización realizada:
// Se definieron tipos con TypeScript y se separaron el buscador, la tarjeta de paciente y la insignia de estado en componentes reutilizables.
const pacientesIniciales: Paciente[] = [
  {
    id: "1",
    nombre: "Ana",
    apellido: "Pérez",
    email: "ana.perez@example.com",
    telefono: "70012345",
    especialidadAsignada: "Cardiología",
    ultimaCita: "2026-10-10",
    estado: "activo",
  },
  {
    id: "2",
    nombre: "Carlos",
    apellido: "Rojas",
    email: "carlos.rojas@example.com",
    telefono: "70023456",
    especialidadAsignada: "Pediatría",
    ultimaCita: "2026-10-08",
    estado: "en_espera",
  },
  {
    id: "3",
    nombre: "María",
    apellido: "Flores",
    email: "maria.flores@example.com",
    telefono: "70034567",
    especialidadAsignada: "Dermatología",
    ultimaCita: "2026-10-05",
    estado: "activo",
  },
  {
    id: "4",
    nombre: "José",
    apellido: "Méndez",
    email: "jose.mendez@example.com",
    telefono: "70045678",
    especialidadAsignada: "Medicina general",
    ultimaCita: "2026-09-28",
    estado: "inactivo",
  },
  {
    id: "5",
    nombre: "Lucía",
    apellido: "Vargas",
    email: "lucia.vargas@example.com",
    telefono: "70056789",
    especialidadAsignada: "Oftalmología",
    ultimaCita: "2026-10-12",
    estado: "en_espera",
  },
];

export default function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState("");

  const pacientesFiltrados = pacientesIniciales.filter((paciente) => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    const nombreCompleto =
      `${paciente.nombre} ${paciente.apellido}`.toLowerCase();

    return (
      nombreCompleto.includes(textoBusqueda) ||
      paciente.email.toLowerCase().includes(textoBusqueda) ||
      paciente.telefono.toLowerCase().includes(textoBusqueda) ||
      paciente.especialidadAsignada.toLowerCase().includes(textoBusqueda)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Clínica Salud Integral
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">Pacientes</h1>

          <p className="mt-2 text-slate-600">
            Consulta y busca los pacientes registrados en la clínica.
          </p>
        </header>

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Lista de pacientes
            </h2>

            <p className="text-sm text-slate-500">
              {pacientesFiltrados.length}{" "}
              {pacientesFiltrados.length === 1 ? "paciente" : "pacientes"}
            </p>
          </div>

          <BuscadorPacientes value={busqueda} onChange={setBusqueda} />
        </section>

        <section
          aria-label="Resultados de pacientes"
          className="flex flex-col gap-4"
        >
          {pacientesFiltrados.length > 0 ? (
            pacientesFiltrados.map((paciente) => (
              <PacienteRow key={paciente.id} paciente={paciente} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <h2 className="font-semibold text-slate-800">
                No se encontraron pacientes
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Prueba con otro nombre, correo o especialidad.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
