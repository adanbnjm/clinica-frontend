export default function SkeletonPacienteRow() {
  return (
    <article
      aria-label="Cargando paciente"
      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Datos principales */}
      <div className="flex flex-col gap-2">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
        <div className="h-4 w-52 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
      </div>

      {/* Información adicional */}
      <div className="flex flex-col gap-2 sm:items-end">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-neutral-800" />
      </div>
    </article>
  );
}
