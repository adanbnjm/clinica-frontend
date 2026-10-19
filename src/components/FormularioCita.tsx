import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CitaFormData } from "../schemas/citaSchema";
import { citaSchema } from "../schemas/citaSchema";
import { useMedicos } from "../hooks/useMedicos";

export default function FormularioCita() {
  const { medicos, cargando } = useMedicos();
  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      pacienteNombre: "",
      medicoId: "",
      fecha: "",
      hora: "",
      motivo: "",
      urgencia: "media",
    },
  });

  const fechaMinima = (() => {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
  })();

  const enviarFormulario = async (datos: CitaFormData) => {
    await new Promise<void>((resolver) => {
      setTimeout(resolver, 1500);
    });

    setCitaConfirmada(datos);
  };

  const agendarOtraCita = () => {
    reset();
    setCitaConfirmada(null);
  };

  const claseCampo = (tieneError: boolean) =>
    `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-slate-900 outline-none transition-colors
    ${
      tieneError
        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    }
    dark:bg-neutral-900 dark:text-neutral-100
    ${tieneError ? "dark:border-rose-500" : "dark:border-neutral-700"}`;

  if (citaConfirmada) {
    const medicoSeleccionado = medicos.find(
      (medico) => medico.id === citaConfirmada.medicoId,
    );

    return (
      <section
        aria-labelledby="titulo-confirmacion"
        className="rounded-2xl border border-emerald-300 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-neutral-950"
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          >
            ✓
          </span>

          <div>
            <h2
              id="titulo-confirmacion"
              className="text-xl font-bold text-slate-900 dark:text-neutral-100"
            >
              ¡Cita agendada!
            </h2>

            <p className="text-sm text-slate-600 dark:text-neutral-400">
              La solicitud se registró correctamente en esta demostración.
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Paciente
            </dt>
            <dd className="font-medium">{citaConfirmada.pacienteNombre}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Médico
            </dt>
            <dd className="font-medium">
              {medicoSeleccionado
                ? `${medicoSeleccionado.nombre} — ${medicoSeleccionado.especialidad}`
                : "No disponible"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Fecha
            </dt>
            <dd className="font-medium">{citaConfirmada.fecha}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Hora
            </dt>
            <dd className="font-medium">{citaConfirmada.hora}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Urgencia
            </dt>
            <dd className="font-medium capitalize">
              {citaConfirmada.urgencia}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-slate-500 dark:text-neutral-400">
              Motivo
            </dt>
            <dd className="whitespace-pre-wrap font-medium">
              {citaConfirmada.motivo}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={agendarOtraCita}
          className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          Agendar otra cita
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-neutral-100">
          Nueva cita
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
          Completa los datos para agendar una consulta médica.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(enviarFormulario)}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        <div>
          <label
            htmlFor="pacienteNombre"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Nombre del paciente *
          </label>

          <input
            id="pacienteNombre"
            type="text"
            placeholder="Ej. Ana Pérez"
            autoComplete="name"
            aria-invalid={Boolean(errors.pacienteNombre)}
            aria-describedby={
              errors.pacienteNombre ? "pacienteNombre-error" : undefined
            }
            {...register("pacienteNombre")}
            className={claseCampo(Boolean(errors.pacienteNombre))}
          />

          {errors.pacienteNombre && (
            <p
              id="pacienteNombre-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.pacienteNombre.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="medicoId"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Médico *
          </label>

          <select
            id="medicoId"
            aria-invalid={Boolean(errors.medicoId)}
            aria-describedby={errors.medicoId ? "medicoId-error" : undefined}
            disabled={cargando}
            {...register("medicoId")}
            className={`${claseCampo(Boolean(errors.medicoId))} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="">
              {cargando ? "Cargando médicos..." : "Selecciona un médico"}
            </option>

            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nombre} — {medico.especialidad}
              </option>
            ))}
          </select>

          {errors.medicoId && (
            <p
              id="medicoId-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.medicoId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Fecha de la cita *
          </label>

          <input
            id="fecha"
            type="date"
            min={fechaMinima}
            aria-invalid={Boolean(errors.fecha)}
            aria-describedby={errors.fecha ? "fecha-error" : undefined}
            {...register("fecha")}
            className={claseCampo(Boolean(errors.fecha))}
          />

          {errors.fecha && (
            <p
              id="fecha-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.fecha.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hora"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Hora de la cita *
          </label>

          <input
            id="hora"
            type="time"
            aria-invalid={Boolean(errors.hora)}
            aria-describedby={errors.hora ? "hora-error" : undefined}
            {...register("hora")}
            className={claseCampo(Boolean(errors.hora))}
          />

          {errors.hora && (
            <p
              id="hora-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.hora.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="urgencia"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Nivel de urgencia *
          </label>

          <select
            id="urgencia"
            aria-invalid={Boolean(errors.urgencia)}
            aria-describedby={errors.urgencia ? "urgencia-error" : undefined}
            {...register("urgencia")}
            className={claseCampo(Boolean(errors.urgencia))}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>

          {errors.urgencia && (
            <p
              id="urgencia-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.urgencia.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="motivo"
            className="block text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            Motivo de la consulta *
          </label>

          <textarea
            id="motivo"
            rows={4}
            maxLength={500}
            placeholder="Describe los síntomas o el motivo de la consulta..."
            aria-invalid={Boolean(errors.motivo)}
            aria-describedby={errors.motivo ? "motivo-error" : "motivo-ayuda"}
            {...register("motivo")}
            className={claseCampo(Boolean(errors.motivo))}
          />

          <p
            id="motivo-ayuda"
            className="mt-1 text-xs text-slate-500 dark:text-neutral-400"
          >
            Escribe entre 10 y 500 caracteres.
          </p>

          {errors.motivo && (
            <p
              id="motivo-error"
              role="alert"
              className="mt-1 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.motivo.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting || cargando}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-neutral-950"
          >
            {isSubmitting && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
            )}

            {isSubmitting ? "Agendando..." : "Agendar cita"}
          </button>
        </div>
      </form>
    </section>
  );
}
