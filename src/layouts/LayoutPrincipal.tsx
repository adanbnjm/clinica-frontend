import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function LayoutPrincipal() {
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
        </nav>
        <NavLink
          to="/citas"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 transition-colors ${
              isActive
                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          Citas
        </NavLink>

        <div className="mt-auto">
          <button
            type="button"
            onClick={() => setModoOscuro((actual) => !actual)}
            aria-pressed={modoOscuro}
            className="w-full rounded-lg border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-neutral-900"
          >
            {modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:pl-64">
        <Outlet />
      </div>
    </div>
  );
}
