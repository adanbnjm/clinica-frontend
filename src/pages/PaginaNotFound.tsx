import { Link } from "react-router-dom";

export default function PaginaNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-black dark:text-neutral-100">
      <div className="w-full max-w-lg text-center">
        <p className="text-8xl font-extrabold tracking-tight text-emerald-600">
          404
        </p>

        <div className="my-6 text-6xl" aria-hidden="true">
          🏥
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">Página no encontrada</h1>

        <p className="mt-4 text-slate-600 dark:text-neutral-400">
          Lo sentimos, la página que buscas no existe o la dirección es
          incorrecta.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          Volver al Dashboard
        </Link>
      </div>
    </main>
  );
}
