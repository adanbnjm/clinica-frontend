interface SpinnerProps {
  fullscreen?: boolean;
}

export default function Spinner({ fullscreen = false }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`flex items-center justify-center ${
        fullscreen ? "min-h-screen" : "p-4"
      }`}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600 dark:border-neutral-700 dark:border-t-indigo-400" />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
