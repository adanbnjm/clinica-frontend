import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function LayoutPrincipal() {
  const navigate = useNavigate();
  const cerrarSesion = useAuthStore((estado) => estado.logout);
  const usuario = useAuthStore((estado) => estado.usuario);

  const manejarCierreSesion = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };
  const [modoOscuro, setModoOscuro] = useState(
    () => localStorage.getItem("tema-clinica") === "oscuro",
  );

  useEffect(() => {
    const elementoRaiz = document.documentElement;

    elementoRaiz.classList.toggle("dark", modoOscuro);

    localStorage.setItem("tema-clinica", modoOscuro ? "oscuro" : "claro");
  }, [modoOscuro]);

  const clasesEnlace = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-700 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 dark:border-neutral-800 dark:bg-black md:flex">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Clínica Salud Integral
          </p>

          <h1 className="mt-2 text-xl font-bold">Panel de gestión</h1>
        </div>

        <nav aria-label="Navegación principal" className="space-y-2">
          <NavLink to="/" end className={clasesEnlace}>
            Dashboard
          </NavLink>

          <NavLink to="/pacientes" className={clasesEnlace}>
            Pacientes
          </NavLink>

          <NavLink to="/citas/nueva" className={clasesEnlace}>
            Nueva cita
          </NavLink>

          <NavLink to="/citas" className={clasesEnlace}>
            Citas
          </NavLink>

          <NavLink to="/reportes" className={clasesEnlace}>
            Reportes
          </NavLink>
        </nav>

        <div className="mt-auto space-y-3">
          <button
            type="button"
            onClick={() => setModoOscuro((actual) => !actual)}
            aria-pressed={modoOscuro}
            className="w-full rounded-lg border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-neutral-900"
          >
            {modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
          </button>

          <button
            type="button"
            onClick={manejarCierreSesion}
            className="w-full rounded-lg border border-red-300 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:pl-64">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div>
            <p className="font-semibold">{usuario?.email ?? "Usuario"}</p>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Rol: {usuario?.rol ?? "Sin rol"}
            </p>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
