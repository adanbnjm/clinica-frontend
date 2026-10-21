import { useState } from "react";
import type { Paciente, EstadoPaciente } from "../types/paciente";

export type FiltroEstado = "Todos" | EstadoPaciente;

export const PACIENTES_INICIALES: Paciente[] = [
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

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(PACIENTES_INICIALES);

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<FiltroEstado>("Todos");

  const textoBusqueda = busqueda.trim().toLowerCase();

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const nombreCompleto =
      `${paciente.nombre} ${paciente.apellido}`.toLowerCase();

    const coincideTexto =
      nombreCompleto.includes(textoBusqueda) ||
      paciente.email.toLowerCase().includes(textoBusqueda) ||
      paciente.telefono.toLowerCase().includes(textoBusqueda) ||
      paciente.especialidadAsignada.toLowerCase().includes(textoBusqueda);

    const coincideEstado =
      estadoFiltro === "Todos" || paciente.estado === estadoFiltro;

    return coincideTexto && coincideEstado;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
  };

  const agregarPaciente = (
    datos: Pick<Paciente, "nombre" | "apellido" | "email" | "estado">,
  ) => {
    const nuevoPaciente: Paciente = {
      id: crypto.randomUUID(),
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim(),
      telefono: "",
      especialidadAsignada: "Sin asignar",
      ultimaCita: "",
      estado: datos.estado,
    };

    setPacientes((actuales) => [...actuales, nuevoPaciente]);
    limpiarFiltros();
  };

  const cambiarEstadoPaciente = (id: string, nuevoEstado: EstadoPaciente) => {
    setPacientes((actuales) =>
      actuales.map((paciente) =>
        paciente.id === id ? { ...paciente, estado: nuevoEstado } : paciente,
      ),
    );
  };

  const eliminarPaciente = (id: string) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este paciente?",
    );

    if (!confirmar) {
      return;
    }

    setPacientes((actuales) =>
      actuales.filter((paciente) => paciente.id !== id),
    );
  };

  return {
    pacientes,
    busqueda,
    setBusqueda,
    estadoFiltro,
    setEstadoFiltro,
    pacientesFiltrados,
    limpiarFiltros,
    agregarPaciente,
    cambiarEstadoPaciente,
    eliminarPaciente,
  };
}
