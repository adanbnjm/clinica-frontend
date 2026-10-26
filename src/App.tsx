import { Route, Routes } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaNuevaCita from "./pages/PaginaNuevaCita";
import PaginaNotFound from "./pages/PaginaNotFound";
import PaginaDetallePaciente from "./pages/PaginaDetallePaciente";
import PaginaCitas from "./pages/PaginaCitas";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route index element={<PaginaDashboard />} />
        <Route path="pacientes" element={<PaginaPacientes />} />
        <Route path="pacientes/:id" element={<PaginaDetallePaciente />} />
        <Route path="citas/nueva" element={<PaginaNuevaCita />} />
        <Route path="citas" element={<PaginaCitas />} />
        <Route path="*" element={<PaginaNotFound />} />
      </Route>
    </Routes>
  );
}
