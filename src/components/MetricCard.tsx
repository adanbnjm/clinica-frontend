import type { Metrica, Tendencia } from "../types";

interface MetricCardProps {
  metrica: Metrica;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: "text-emerald-600 dark:text-emerald-400",
  negativa: "text-rose-600 dark:text-rose-400",
  neutra: "text-slate-600 dark:text-neutral-400",
};

export default function MetricCard({ metrica }: MetricCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-slate-500 dark:text-neutral-400">
          {metrica.titulo}
        </h2>

        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-2xl dark:bg-emerald-950">
          {metrica.icono}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-neutral-100">
        {metrica.valor}
      </p>

      <p className={`mt-2 text-sm ${colorPorTendencia[metrica.tendencia]}`}>
        {metrica.descripcion}
      </p>
    </article>
  );
}
