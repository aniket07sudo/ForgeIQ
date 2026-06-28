import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface WizardContextValue<T> {
  currentStep: number;
  next(): void;
  prev(): void;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  footer: React.ReactNode;
  setFooter(footer: React.ReactNode): void;
}

export const WizardContext = createContext<WizardContextValue<any> | null>(
  null,
);

interface WizardProviderProps<T> {
  children: ReactNode;
  totalSteps: number;
  initalStep?: number;
  initialData?: T;
}

export function WizardProvider<T>({
  children,
  totalSteps,
  initalStep = 0,
  initialData,
}: WizardProviderProps<T>) {
  const [currentStep, setCurrentStep] = useState(initalStep);

  const [footer, setFooter] = useState<ReactNode>(null);

  const [data, setData] = useState<T | undefined>(initialData);

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const value = useMemo(
    () => ({
      currentStep,
      next,
      prev,
      footer,
      setFooter,
      setData,
      data,
    }),
    [currentStep, footer, next, prev],
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard<T>() {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error("useWizard must be used inside WizardProvider");
  }

  return context as WizardContextValue<T>;
}
