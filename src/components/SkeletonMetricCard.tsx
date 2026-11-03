export default function SkeletonMetricCard() {
  return (
    <article
      aria-label="Cargando métrica"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />

        <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-4 h-9 w-20 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />

      <div className="mt-2 h-4 w-36 animate-pulse rounded bg-slate-200 dark:bg-neutral-800" />
    </article>
  );
}
