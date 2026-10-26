import axios from "axios";

export function extraerMensajeError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const mensaje = err.response?.data?.message;

    if (Array.isArray(mensaje)) {
      return mensaje.join(", ");
    }

    if (typeof mensaje === "string") {
      return mensaje;
    }

    if (err.response?.status === 401) {
      return "Tu sesión ha expirado. Inicia sesión nuevamente.";
    }

    if (err.response?.status === 403) {
      return "No tienes permisos para realizar esta acción.";
    }

    if (!err.response) {
      return "No se pudo conectar con el servidor.";
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Ha ocurrido un error inesperado.";
}
