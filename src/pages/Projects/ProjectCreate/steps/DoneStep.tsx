import { Button, Card } from "../../../../components/UI";
import { Modal, useModal } from "../../../../components";
import { useWizard } from "../Wizard/context";
import { useCallback, useEffect, useState } from "react";
import SvgIcon from "../../../../components/Icon/SvgIcon";
import styles from "../ProjectCreate.module.scss";
import {
  getProjectStatus,
  type ProjectStatusResponse,
} from "../../../../api/project/project.api";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../Planning/Breakdown/components/Badge/Badge";
import { PROJECT_BADGES } from "../../config";

export const DoneStep = () => {
  const { setFooter, data } = useWizard<{ projectId: string }>();
  const [info, setInfo] = useState<ProjectStatusResponse | null>(null);
  const { closeModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    setFooter(
      <>
        <Modal.FooterAction align="right" onClick={navigateToBreakdown}>
          <Button variant="solid">Create Breakdown</Button>
        </Modal.FooterAction>
      </>,
    );
  }, []);

  const navigateToBreakdown = () => {
    closeModal();
    navigate("/planning/breakdown/generate", {
      state: {
        projectId: data.projectId,
      },
    });
  };

  const loadProjects = useCallback(async () => {
    try {
      const response = await getProjectStatus(data.projectId);

      setInfo(response);
    } catch (error) {
      console.error("Failed to load Jira projects", error);
    } finally {
    }
  }, [data.projectId]);

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Modal.Content>
      <div className={styles.successStep}>
        <SvgIcon name="tick" size={80} color="rgb(94, 230, 106)" />
        <h2>Jira Connected Successfully</h2>
      </div>
      <Card className={styles.connectionSummary}>
        <h3>Connection Summary</h3>
        <div className={styles.dataGrid}>
          <div className={styles.row}>
            <span className={styles.key}>Jira Site</span>
            <span className={styles.value}>{info?.jiraSite}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.key}>Project</span>
            <span className={styles.value}>
              {info?.jiraProjectKey} - {info?.jiraProjectName}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>Jira Account</span>
            <span className={styles.value}>{info?.jiraAccount}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>Status</span>
            {info?.status && (
              <span className={styles.value}>
                <Badge {...PROJECT_BADGES[info?.status]} />
              </span>
            )}
          </div>
        </div>
      </Card>
    </Modal.Content>
  );
};
