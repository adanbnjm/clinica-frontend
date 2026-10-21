import { useEffect, useState } from "react";
import type { Paciente, EstadoPaciente } from "../types/paciente";
import { api } from "../lib/axios";

export type FiltroEstado = "Todos" | EstadoPaciente;
interface PacienteApi {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  ci: string;
  email: string;
  telefono: string | null;
  direccion: string | null;
  fechaNacimiento: string;
}

function adaptarPaciente(paciente: PacienteApi): Paciente {
  return {
    ...paciente,
    apellido: [paciente.apellidoPaterno, paciente.apellidoMaterno]
      .filter(Boolean)
      .join(" "),
    telefono: paciente.telefono ?? "",
    estado: "activo",
  };
}
export const PACIENTES_INICIALES: Paciente[] = [
  {
    id: 1,
    nombre: "Ana",
    apellido: "Pérez",
    apellidoPaterno: "Pérez",
    apellidoMaterno: null,
    ci: "10000001",
    fechaNacimiento: "1995-04-12",
    email: "ana.perez@example.com",
    telefono: "70012345",
    especialidadAsignada: "Cardiología",
    ultimaCita: "2026-10-10",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Carlos",
    apellido: "Rojas",
    apellidoPaterno: "rojas",
    apellidoMaterno: null,
    ci: "10000002",
    fechaNacimiento: "1990-06-20",
    email: "carlos.rojas@example.com",
    telefono: "70023456",
    especialidadAsignada: "Pediatría",
    ultimaCita: "2026-10-08",
    estado: "en_espera",
  },
  {
    id: 3,
    nombre: "María",
    apellido: "Flores",
    apellidoPaterno: "flores",
    apellidoMaterno: null,
    ci: "10000003",
    fechaNacimiento: "2000-02-15",
    email: "maria.flores@example.com",
    telefono: "70034567",
    especialidadAsignada: "Dermatología",
    ultimaCita: "2026-10-05",
    estado: "activo",
  },
  {
    id: 4,
    nombre: "José",
    apellido: "Méndez",
    apellidoPaterno: "mendez",
    apellidoMaterno: null,
    ci: "10000004",
    fechaNacimiento: "1985-11-08",
    email: "jose.mendez@example.com",
    telefono: "70045678",
    especialidadAsignada: "Medicina general",
    ultimaCita: "2026-09-28",
    estado: "inactivo",
  },
  {
    id: 5,
    nombre: "Lucía",
    apellido: "Vargas",
    apellidoPaterno: "vargas",
    apellidoMaterno: null,
    ci: "10000005",
    fechaNacimiento: "1998-09-25",
    email: "lucia.vargas@example.com",
    telefono: "70056789",
    especialidadAsignada: "Oftalmología",
    ultimaCita: "2026-10-12",
    estado: "en_espera",
  },
];

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const cargarPacientes = async () => {
    try {
      setCargando(true);
      setErrorCarga("");

      const respuesta = await api.get<PacienteApi[]>("/pacientes");
      setPacientes(respuesta.data.map(adaptarPaciente));
    } catch {
      setErrorCarga(
        "No se pudieron cargar los pacientes. Comprueba tu sesión y que el backend esté funcionando.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarPacientes();
  }, []);

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
      (paciente.especialidadAsignada ?? "")
        .toLowerCase()
        .includes(textoBusqueda);

    const coincideEstado =
      estadoFiltro === "Todos" || paciente.estado === estadoFiltro;

    return coincideTexto && coincideEstado;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
  };

  const agregarPaciente = async (datos: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    ci: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
  }) => {
    try {
      setErrorCarga("");

      const respuesta = await api.post<PacienteApi>("/pacientes", {
        nombre: datos.nombre.trim(),
        apellidoPaterno: datos.apellidoPaterno.trim(),
        apellidoMaterno: datos.apellidoMaterno.trim() || undefined,
        ci: datos.ci.trim(),
        email: datos.email.trim(),
        fechaNacimiento: datos.fechaNacimiento,
        telefono: datos.telefono.trim() || undefined,
      });

      const nuevoPaciente = adaptarPaciente(respuesta.data);

      setPacientes((actuales) => [...actuales, nuevoPaciente]);
      limpiarFiltros();

      return true;
    } catch {
      setErrorCarga(
        "No se pudo registrar el paciente. Verifica los datos, tu sesión y que el CI y el correo no estén registrados.",
      );

      return false;
    }
  };

  const cambiarEstadoPaciente = (id: number, nuevoEstado: EstadoPaciente) => {
    setPacientes((actuales) =>
      actuales.map((paciente) =>
        paciente.id === id ? { ...paciente, estado: nuevoEstado } : paciente,
      ),
    );
  };

  const eliminarPaciente = (id: number) => {
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
    cargando,
    errorCarga,
    cargarPacientes,
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
