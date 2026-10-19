import { useEffect, useState } from "react";
import PaginaPacientes from "./pages/PaginaPacientes";

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("tema-clinica") === "oscuro";
  });

  useEffect(() => {
    const elementoRaiz = document.documentElement;

    elementoRaiz.classList.toggle("dark", modoOscuro);

    localStorage.setItem("tema-clinica", modoOscuro ? "oscuro" : "claro");
  }, [modoOscuro]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex justify-end px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => setModoOscuro((actual) => !actual)}
          aria-label={
            modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
          aria-pressed={modoOscuro}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          {modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>
      </div>

      <PaginaPacientes />
    </div>
  );
}
