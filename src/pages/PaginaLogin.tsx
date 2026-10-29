import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as iniciarSesion } from "../services/auth";
import type { LoginFormData } from "../schemas/loginSchema";
import { loginSchema } from "../schemas/loginSchema";
import { useAuthStore } from "../stores/authStore";
import { extraerMensajeError } from "../lib/errorHandler";

export default function PaginaLogin() {
  const navigate = useNavigate();
  const guardarSesion = useAuthStore((estado) => estado.login);
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (datos: LoginFormData) => {
    setEnviando(true);

    try {
      const { token, usuario } = await iniciarSesion(datos);

      guardarSesion(token, usuario);
      toast.success("¡Bienvenido!");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      toast.error(extraerMensajeError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-black">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Clínica Salud Integral
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Iniciar sesión
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400">
            Ingresa tus credenciales para continuar.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              autoComplete="username"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              placeholder="usuario@clinica.com"
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-neutral-200"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              placeholder="Mínimo 6 caracteres"
            />

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
