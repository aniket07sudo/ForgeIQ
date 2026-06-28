import { Modal } from "../../../components";
import { ConnectJiraStep } from "./steps/ConnectJiraStep";
import { CreateProjectStep } from "./steps/CreateProjectStep";
import { DoneStep } from "./steps/DoneStep";
import { SelectProjectStep } from "./steps/SelectProjectStep";
import type { WizardStep } from "./types";
import { WizardProvider } from "./Wizard/context";
import { Wizard } from "./Wizard/Wizard";

const steps: WizardStep[] = [
  {
    id: "create",
    title: "Create Project",
    description: "Create Project",
    Component: CreateProjectStep,
  },
  {
    id: "jira",
    title: "Connect Jira",
    description: "Connect your Jira account to enable seamless breakdown sync and issue management",
    Component: ConnectJiraStep,
  },
  {
    id: "select",
    title: "Select Project",
    description: "Only projects that are fully ready can be selected",
    Component: SelectProjectStep,
  },
  {
    id: "done",
    title: "Project Is Ready",
    description: "Your Jira connection is complete and a Jira project has been linked.",
    Component: DoneStep,
  },
];

interface ProjectWizardData {
  projectId?: string;
  projectName?: string;
  jiraConnected?: boolean;
  jiraProjectId?: string;
}

interface ProjectCreateWizardProps {
  initialStep?: number;
  initialData?: ProjectWizardData;
}

const ProjectCreateWizard = ({
  initialStep,
  initialData,
}: ProjectCreateWizardProps) => {
  return (
    <Modal.Root>
      <WizardProvider
        initalStep={initialStep}
        initialData={initialData}
        totalSteps={steps.length}
      >
        <Wizard steps={steps} />
      </WizardProvider>
    </Modal.Root>
  );
};

export default ProjectCreateWizard;
