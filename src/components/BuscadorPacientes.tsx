import type * as React from "react";

interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BuscadorPacientes({
  value,
  onChange,
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

      <input
        id="busqueda-pacientes"
        type="search"
        value={value}
        onChange={manejarCambio}
        placeholder="Nombre, correo o teléfono..."
        aria-label="Buscar pacientes por nombre, correo, teléfono o especialidad"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-emerald-400"
      />
    </div>
  );
}
