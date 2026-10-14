interface BuscadorPacientesProps {
  value: string;
  onChange: (valor: string) => void;
}

export default function BuscadorPacientes({
  value,
  onChange,
}: BuscadorPacientesProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        Buscar paciente
      </span>

      <input
        type="search"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        placeholder="Buscar por nombre, apellido o correo..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
