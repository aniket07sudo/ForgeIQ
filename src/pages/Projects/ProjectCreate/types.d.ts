export interface WizardStep {
  id: string;
  title: string;
  description: string;
  Component: ComponentType<WizardStepComponentProps>;
}