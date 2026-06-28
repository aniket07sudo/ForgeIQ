import { Button } from "../../../../components/UI";
import { Modal } from "../../../../components";
import { useWizard } from "../Wizard/context";
import { useCallback, useEffect, useState } from "react";
import styles from "../ProjectCreate.module.scss";
import { Badge } from "../../../Planning/Breakdown/components/Badge/Badge";
import { PROJECT_BADGES } from "../../config";
import {
  getJiraProjects,
  selectJiraProject,
  type JiraProjectResponseDto,
} from "../../../../api/project/project.api";
import Loader from "../../../../assets/loader/loader";

export const SelectProjectStep = () => {
  const { setFooter, prev, data, next } = useWizard<{ projectId: string }>();
  const [projects, setProjects] = useState<JiraProjectResponseDto[]>();
  const [isConnecting, setIsConnecting] = useState(false);

  const [selectedProject, setSelectedProject] =
    useState<JiraProjectResponseDto | null>(null);

  useEffect(() => {
    setFooter(
      <>
        <Modal.FooterAction align="left" onClick={prev}>
          <Button>Back</Button>
        </Modal.FooterAction>

        <Modal.FooterAction align="right">
          <Button variant="solid" onClick={handleConnect}>
            {isConnecting ? <Loader /> : <>Connect</>}
          </Button>
        </Modal.FooterAction>
      </>,
    );
  }, [projects, selectedProject]);

  const handleConnect = async () => {
    if (!selectedProject) {
      return;
    }

    try {
      setIsConnecting(true);

      await selectJiraProject(parseInt(data.projectId), {
        projectId: data.projectId,
        projectKey: selectedProject.key,
        projectName: selectedProject.name
      });

      next();
    } catch (error) {
      console.error("Failed to connect Jira project", error);

      // TODO:
      // showErrorToast("Unable to connect Jira project.");
    } finally {
      setIsConnecting(false);
    }
  };

  const loadProjects = useCallback(async () => {
    if (!data.projectId) return;

    try {
      const response = await getJiraProjects(data.projectId);

      setProjects(response);
    } catch (error) {
      console.error("Failed to load Jira projects", error);
    } finally {
    }
  }, [data.projectId]);

  const handleSelect = useCallback((project: JiraProjectResponseDto) => {
    setSelectedProject(project);
  }, []);

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Modal.Content>
      <div className={styles.selectprojects}>
        {projects?.map((project) => (
          <div
            className={`${styles.projectCard} ${project.id == selectedProject?.id ? styles.projectSelected : ""}`}
            onClick={handleSelect.bind(null, project)}
          >
            <div className={styles.projectTitle}>
              <h3>
                {project.key} - {project.name}
              </h3>
              <div className={styles.projectKey}>
                Key : <span>{project.id}</span>
              </div>
            </div>
            <Badge {...PROJECT_BADGES["READY"]} />
          </div>
        ))}
      </div>
    </Modal.Content>
  );
};
