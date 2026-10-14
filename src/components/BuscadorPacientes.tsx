interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BuscadorPacientes({
  value,
  onChange,
}: BuscadorPacientesProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="busqueda-pacientes"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        Buscar paciente
      </label>

      <input
        id="busqueda-pacientes"
        type="search"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        placeholder="Nombre, correo o teléfono..."
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400"
      />
    </div>
  );
}
