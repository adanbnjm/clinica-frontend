import { Route, Routes } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaNuevaCita from "./pages/PaginaNuevaCita";
import PaginaNotFound from "./pages/PaginaNotFound";
import PaginaDetallePaciente from "./pages/PaginaDetallePaciente";
import PaginaCitas from "./pages/PaginaCitas";
import PaginaReportes from "./pages/PaginaReportes";
import PaginaLogin from "./pages/PaginaLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />

      <Route element={<LayoutPrincipal />}>
        <Route index element={<PaginaDashboard />} />
        <Route path="pacientes" element={<PaginaPacientes />} />
        <Route path="pacientes/:id" element={<PaginaDetallePaciente />} />
        <Route path="citas/nueva" element={<PaginaNuevaCita />} />
        <Route path="citas" element={<PaginaCitas />} />
        <Route path="reportes" element={<PaginaReportes />} />
        <Route path="*" element={<PaginaNotFound />} />
      </Route>
    </Routes>
  );
}
