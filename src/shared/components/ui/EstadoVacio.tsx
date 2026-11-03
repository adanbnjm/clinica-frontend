interface EstadoVacioProps {
  titulo: string;
  mensaje: string;
  textoAccion?: string;
  onAccion?: () => void;
}

export default function EstadoVacio({
  titulo,
  mensaje,
  textoAccion,
  onAccion,
}: EstadoVacioProps) {
  return (
    <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center dark:border-neutral-700 dark:bg-neutral-950">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500 dark:bg-neutral-800 dark:text-neutral-300">
        <span aria-hidden="true">∅</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {titulo}
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-neutral-400">
        {mensaje}
      </p>

      {textoAccion && onAccion && (
        <button
          type="button"
          onClick={onAccion}
          className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          {textoAccion}
        </button>
      )}
    </section>
  );
}
