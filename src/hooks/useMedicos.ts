import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface MedicoApi {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  especialidadId: number;
}

export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
}

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarMedicos = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await api.get<MedicoApi[]>("/medicos");

        if (activo) {
          setMedicos(
            respuesta.data.map((medico) => ({
              id: medico.id,
              nombre: `${medico.nombre} ${medico.apellidoPaterno}${
                medico.apellidoMaterno ? ` ${medico.apellidoMaterno}` : ""
              }`,
              especialidad: `Especialidad #${medico.especialidadId}`,
            })),
          );
        }
      } catch {
        if (activo) {
          setError(
            "No se pudieron cargar los médicos. Comprueba tu sesión y vuelve a intentarlo.",
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void cargarMedicos();

    return () => {
      activo = false;
    };
  }, []);

  return { medicos, cargando, error };
}
