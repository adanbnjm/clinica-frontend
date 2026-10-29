import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface RutaProtegidaProps {
  rolesPermitidos?: string[];
}

export default function RutaProtegida({ rolesPermitidos }: RutaProtegidaProps) {
  const isAuthenticated = useAuthStore((estado) => estado.isAuthenticated);
  const usuario = useAuthStore((estado) => estado.usuario);
  const location = useLocation();

  if (!isAuthenticated || !usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
}
