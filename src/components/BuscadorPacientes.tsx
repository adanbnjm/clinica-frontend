import type * as React from "react";

interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
  cargando?: boolean;
}

export default function BuscadorPacientes({
  value,
  onChange,
  cargando = false,
}: BuscadorPacientesProps) {
  const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evento.currentTarget.value);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="busqueda-pacientes"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-neutral-200"
      >
        Buscar pacientes
      </label>

      <div className="relative">
        <input
          id="busqueda-pacientes"
          type="search"
          value={value}
          onChange={manejarCambio}
          placeholder="Nombre, correo o teléfono..."
          aria-label="Buscar pacientes por nombre, correo, teléfono o CI"
          aria-busy={cargando}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-emerald-400"
        />

        {cargando && (
          <span
            role="status"
            aria-label="Buscando pacientes"
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
          />
        )}
      </div>
    </div>
  );
}
