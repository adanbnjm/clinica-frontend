import FormularioCita from "../components/FormularioCita";
import { useNavigate } from "react-router-dom";

export default function PaginaNuevaCita() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-black dark:text-neutral-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Clínica Salud Integral
          </p>

          <h1 className="mt-2 text-3xl font-bold">Agenda de citas</h1>

          <p className="mt-2 text-slate-600 dark:text-neutral-400">
            Registra una nueva consulta médica de forma sencilla y segura.
          </p>
        </header>

        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            ← Cancelar
          </button>
        </div>

        <FormularioCita />
      </div>
    </main>
  );
}
