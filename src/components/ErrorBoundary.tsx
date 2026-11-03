import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface Estado {
  ocurrioError: boolean;
}

export default class ErrorBoundary extends Component<Props, Estado> {
  state: Estado = {
    ocurrioError: false,
  };

  static getDerivedStateFromError(): Estado {
    return { ocurrioError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.ocurrioError) {
      return (
        <section
          role="alert"
          className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          <h2 className="text-lg font-semibold">
            No se pudo mostrar esta sección
          </h2>
          <p className="mt-2 text-sm">
            Ocurrió un error inesperado. Puedes intentar cargarla nuevamente.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ ocurrioError: false })}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Intentar nuevamente
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
