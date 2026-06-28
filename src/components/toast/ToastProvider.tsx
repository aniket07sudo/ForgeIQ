import { useCallback, useMemo, useState } from "react";
import {
  ToastContext,
  type PromiseToastOptions,
  type ToastVariant,
} from "./context";
import { createPortal } from "react-dom";
import { ToastContainer } from "./ToastContainer";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastItem {
  id: number;
  variant: ToastVariant;
  message: string;
  duration: number;
  closing: boolean;
}

let toastId = 0;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  }, []);

  const closeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id == id ? { ...toast, closing: true } : toast,
      ),
    );
  }, []);

  const showToast = useCallback(
    (variant: ToastVariant, message: string, duration = 3000) => {
      const id = ++toastId;
      setToasts((prev) => [
        ...prev,
        {
          id,
          closing: false,
          duration,
          message,
          variant,
        },
      ]);
      return id;
    },
    [toasts],
  );

  const updateToast = useCallback(
    (id: number, variant: ToastVariant, message: string, duration = 3000) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                variant,
                message,
                duration,
              }
            : toast,
        ),
      );

      if (duration > 0) {
        window.setTimeout(() => closeToast(id), duration);
      }
    },
    [closeToast],
  );

  const promise = useCallback(
    async <T,>(promise: Promise<T>, options: PromiseToastOptions<T>) => {
      const id = showToast("loading", options.loading);

      try {
        const result = await promise;
        updateToast(
          id,
          "success",
          typeof options.success === "function"
            ? options.success(result)
            : options.success,
        );

        return result;
      } catch (err) {
        updateToast(
          id,
          "error",
          typeof options.error === "function"
            ? options.error(error)
            : options.error,
        );
        throw err;
      }
    },
    [],
  );

  const success = useCallback((message: string) => {
    const id = showToast("success", message);
    setTimeout(() => closeToast(id), 3000);
  }, []);

  const error = useCallback((message: string) => {
    const id = showToast("error", message);
    setTimeout(() => closeToast(id), 3000);
  }, []);

  const info = useCallback((message: string) => {
    const id = showToast("info", message);
    setTimeout(() => closeToast(id), 3000);
  }, []);

  const warning = useCallback((message: string) => {
    const id = showToast("warning", message);
    setTimeout(() => closeToast(id), 3000);
  }, []);

  const value = useMemo(
    () => ({
      error,
      info,
      success,
      warning,
      promise,
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <ToastContainer
          closeToast={closeToast}
          removeToast={removeToast}
          toasts={toasts}
        />,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
