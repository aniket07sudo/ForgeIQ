import { useMemo } from "react";
import type { WizardStep } from "../types";
import { Modal, useModal } from "../../../../components";
import { useWizard } from "./context";

interface WizardProps {
  steps: WizardStep[];
}

export function Wizard({ steps }: WizardProps) {
  const { footer, currentStep } = useWizard();

  const { closeModal } = useModal();

  const CurrentStep = useMemo(
    () => steps[currentStep].Component,
    [steps, currentStep],
  );

  return (
    <>
      {/* <Stepper steps={steps} currentStep={currentStep} /> */}
      <Modal.Header onClose={() => closeModal()}>
        <h2>{steps[currentStep].title}</h2>
        <p>{steps[currentStep].description}</p>
      </Modal.Header>
      <Modal.Content>
        <CurrentStep />
      </Modal.Content>
      <Modal.Footer>{footer}</Modal.Footer>
    </>
  );
}
