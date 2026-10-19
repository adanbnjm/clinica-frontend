import { useEffect, useState } from "react";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaNuevaCita from "./pages/PaginaNuevaCita";

type Pagina = "pacientes" | "citas";

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("tema-clinica") === "oscuro";
  });

  const [paginaActual, setPaginaActual] = useState<Pagina>("citas");

  useEffect(() => {
    const elementoRaiz = document.documentElement;

    elementoRaiz.classList.toggle("dark", modoOscuro);

    localStorage.setItem("tema-clinica", modoOscuro ? "oscuro" : "claro");
  }, [modoOscuro]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-black sm:px-6">
        <nav aria-label="Navegación principal" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPaginaActual("pacientes")}
            aria-current={paginaActual === "pacientes" ? "page" : undefined}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              paginaActual === "pacientes"
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            }`}
          >
            Pacientes
          </button>

          <button
            type="button"
            onClick={() => setPaginaActual("citas")}
            aria-current={paginaActual === "citas" ? "page" : undefined}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              paginaActual === "citas"
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            }`}
          >
            Nueva cita
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setModoOscuro((actual) => !actual)}
          aria-label={
            modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
          aria-pressed={modoOscuro}
          className="rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          {modoOscuro ? "☀ Modo claro" : "☾ Modo oscuro"}
        </button>
      </header>

      {paginaActual === "pacientes" ? <PaginaPacientes /> : <PaginaNuevaCita />}
    </div>
  );
}
