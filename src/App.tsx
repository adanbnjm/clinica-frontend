import { Route, Routes } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import RutaProtegida from "./components/RutaProtegida";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaNuevaCita from "./pages/PaginaNuevaCita";
import PaginaNotFound from "./pages/PaginaNotFound";
import PaginaDetallePaciente from "./pages/PaginaDetallePaciente";
import PaginaCitas from "./pages/PaginaCitas";
import PaginaReportes from "./pages/PaginaReportes";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaSinAcceso from "./pages/PaginaSinAcceso";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/sin-acceso" element={<PaginaSinAcceso />} />

      <Route element={<RutaProtegida />}>
        <Route element={<LayoutPrincipal />}>
          <Route index element={<PaginaDashboard />} />
          <Route path="pacientes" element={<PaginaPacientes />} />
          <Route path="pacientes/:id" element={<PaginaDetallePaciente />} />
          <Route path="citas/nueva" element={<PaginaNuevaCita />} />
          <Route path="citas" element={<PaginaCitas />} />
          <Route path="*" element={<PaginaNotFound />} />
        </Route>
      </Route>

      <Route
        element={<RutaProtegida rolesPermitidos={["GERENCIA", "ADMIN"]} />}
      >
        <Route element={<LayoutPrincipal />}>
          <Route path="reportes" element={<PaginaReportes />} />
        </Route>
      </Route>
    </Routes>
  );
}
