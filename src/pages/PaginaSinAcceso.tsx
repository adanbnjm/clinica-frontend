import { Link } from "react-router-dom";

export default function PaginaSinAcceso() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-black">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="text-3xl font-bold text-red-600">Acceso denegado</h1>

        <p className="mt-4 text-slate-600 dark:text-neutral-300">
          No tienes permisos para acceder a esta página.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-800"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
