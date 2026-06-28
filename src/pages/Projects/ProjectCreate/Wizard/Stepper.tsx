import type { WizardStep } from "../types";
import styles from "./Stepper.module.scss";

interface Props {
  steps: WizardStep[];
  currentStep: number;
}

export function Stepper({
  steps,
  currentStep,
}: Props) {
  return (
    <div className={styles.root}>
      {steps.map((step, index) => {
        const completed = index < currentStep;
        const active = index === currentStep;

        return (
          <div
            key={step.id}
            className={styles.item}
          >
            <div
              className={[
                styles.circle,
                completed && styles.completed,
                active && styles.active,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {completed ? "✓" : index + 1}
            </div>

            <span className={styles.label}>
              {step.title}
            </span>

            {index !== steps.length - 1 && (
              <div
                className={[
                  styles.line,
                  completed && styles.lineCompleted,
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}