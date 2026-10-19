import { useEffect, useState } from "react";

export interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
}

const medicosSimulados: Medico[] = [
  {
    id: "medico-1",
    nombre: "Dra. Laura Méndez",
    especialidad: "Cardiología",
  },
  {
    id: "medico-2",
    nombre: "Dr. Carlos Rojas",
    especialidad: "Pediatría",
  },
  {
    id: "medico-3",
    nombre: "Dra. María Flores",
    especialidad: "Dermatología",
  },
  {
    id: "medico-4",
    nombre: "Dr. José Vargas",
    especialidad: "Medicina general",
  },
];

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMedicos(medicosSimulados);
      setCargando(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { medicos, cargando };
}
