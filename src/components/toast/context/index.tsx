import { createContext } from "react";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export interface PromiseToastOptions<T> {
  loading: string;
  success: string | ((value: T) => string);
  error: string | ((error: unknown) => string);
  duration?: number;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  promise: <T>(
    promise: Promise<T>,
    options: PromiseToastOptions<T>,
  ) => Promise<T>;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
