interface StatusBadgeProps {
  activo: boolean;
}

export default function StatusBadge({ activo }: StatusBadgeProps) {
  const colorPorEstado = activo
    ? "bg-emerald-100 text-emerald-700"
    : "bg-rose-100 text-rose-700";

  const textoEstado = activo ? "Sistema Operativo" : "Modo Mantenimiento";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colorPorEstado}`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          activo ? "bg-emerald-500" : "bg-rose-500"
        }`}
        aria-hidden="true"
      />

      {textoEstado}
    </span>
  );
}
