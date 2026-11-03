type TipoAlerta = "info" | "success" | "warning" | "error";

interface AlertaBannerProps {
  tipo: TipoAlerta;
  titulo?: string;
  mensaje: string;
  onCerrar?: () => void;
}

const estilosPorTipo: Record<TipoAlerta, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
};

export default function AlertaBanner({
  tipo,
  titulo,
  mensaje,
  onCerrar,
}: AlertaBannerProps) {
  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 ${estilosPorTipo[tipo]}`}
    >
      <div>
        {titulo && <h3 className="font-semibold">{titulo}</h3>}
        <p className={titulo ? "mt-1 text-sm" : "text-sm"}>{mensaje}</p>
      </div>

      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar alerta"
          className="shrink-0 rounded-md px-2 py-1 font-semibold hover:bg-black/5 dark:hover:bg-white/10"
        >
          ×
        </button>
      )}
    </div>
  );
}
