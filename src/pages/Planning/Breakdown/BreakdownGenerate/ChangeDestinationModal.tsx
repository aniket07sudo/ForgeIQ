import { useCallback, useEffect, useState } from "react";
import { Modal, useModal } from "../../../../components";
import { Button } from "../../../../components/UI";
import {
  getProjects,
  type ProjectDto,
} from "../../../../api/project/project.api";
import { Badge } from "../components/Badge/Badge";
import styles from "./BreakdownGenerate.module.scss";
import Checkbox from "../../../../components/Checkbox/Checkbox";

interface ChangeDestinationModalProps {
  defaultSelected?: ProjectDto |  null;
  onSelect: (project: ProjectDto) => void;
}

export const ChangeDestination = ({
  defaultSelected,
  onSelect,
}: ChangeDestinationModalProps) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const { closeModal } = useModal();
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
    defaultSelected ?? null,
  );

  const loadProjects = useCallback(async () => {
    try {
      const response = await getProjects();
      setProjects(response);
    } catch (error) {
      console.error("Failed to load Jira projects", error);
    } finally {
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = () => {
    if (!selectedProject) {
      return;
    }
    onSelect(selectedProject);
    closeModal();
  };

  return (
    <Modal.Root>
      <Modal.Header onClose={() => closeModal()}>
        <h2>Change Jira Project</h2>
        <p>Only projects that are fully ready can be selected.</p>
      </Modal.Header>
      <Modal.Content>
        {projects.map((project) => (
          <label
            className={`${styles.jiraProjectOption} ${
              project?.id === selectedProject?.id
                ? styles.jiraProjectSelected
                : ""
            }`}
          >
            <div className={styles.leftAlign}>
              <Checkbox
                checked={project?.id == selectedProject?.id}
                onChange={() => setSelectedProject(project)}
              />
              <div className={styles.jiraProjectOptionContent}>
                <h3>Publish project</h3>
                <p>Key : {project?.jiraConnection?.jiraProjectKey}</p>
              </div>
            </div>
            <Badge
              icon={"tick"}
              label="Ready"
              iconColor="rgb(94, 230, 106)"
              textColor="rgb(94, 230, 106)"
              backgroundColor="rgba(94, 230, 106, 0.12)"
            />
          </label>
        ))}
      </Modal.Content>
      <Modal.Footer>
        <Modal.FooterAction align="left">
          <Button>Cancel</Button>
        </Modal.FooterAction>
        <Modal.FooterAction align="right" onClick={handleChange}>
          <Button variant="solid">Select Project</Button>
        </Modal.FooterAction>
      </Modal.Footer>
    </Modal.Root>
  );
};
