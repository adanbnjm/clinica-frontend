export default function SkeletonCitaRow() {
  return (
    <tr aria-label="Cargando cita" className="animate-pulse">
      <td className="px-4 py-4">
        <div className="h-5 w-12 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-4">
        <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-4">
        <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-4">
        <div className="h-5 w-36 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-4">
        <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
    </tr>
  );
}
