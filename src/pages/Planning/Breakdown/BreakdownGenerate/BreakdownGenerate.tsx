import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button, Card, Input, TextArea } from "../../../../components/UI";
import styles from "./BreakdownGenerate.module.scss";
import { generateBreakdown } from "../../../../api/planning/breakdown.api";
import Icon from "../../../../components/Icon";
import { Loader } from "../../../../assets/loader/loader";
import { saveBreakdownDraft } from "../../../../api/planning/draft.api";
import { usePageHeader } from "../../../../hooks/usePageheader";
import {
  getProjects,
  type ProjectDto,
} from "../../../../api/project/project.api";
import SvgIcon from "../../../../components/Icon/SvgIcon";
import { useModal, useToast } from "../../../../components";
import { ChangeDestination } from "./ChangeDestinationModal";
import { useLocation, useNavigate } from "react-router-dom";

type FormData = {
  title: string;
  description: string;
  additionalContext: string;
};

const INITIAL_FORM: FormData = {
  title: "",
  description: "",
  additionalContext: "",
};

export const BreakdownGenerate = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectDto | null>(null);
  const { openModal } = useModal();
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.projectId) {
      setCurrentProject(
        projects.find((project) => project?.id == state?.projectId) ?? null,
      );
    } else if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[projects.length - 1]);
    }
  }, [projects, currentProject]);

  const pageHeaderProps = useMemo(
    () => ({
      title: "Enter Requirement",
    }),
    [],
  );

  usePageHeader(pageHeaderProps);

  const handleChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleClear = () => {
    setFormData(INITIAL_FORM);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentProject) return;
    try {
      setIsSubmitting(true);

      const breakdownId = await toast.promise(
        generateBreakdown({
          projectId: currentProject?.id,
          title: formData.title.trim(),
          description: formData.description.trim(),
          additionalContext: formData.additionalContext.trim(),
        }),
        {
          success: "Breakdown created successfully",
          error: "Error",
          loading: "Breakdown generation is in progress",
        },
      );

      navigate(`/planning/breakdown/${breakdownId}`);
    } catch (error) {
      console.error("Failed to generate breakdown", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitDraft = async () => {
    if (!currentProject) return;
    try {
      setSaveDraftLoading(true);
      await saveBreakdownDraft({
        projectId: currentProject.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        additionalContext: formData.additionalContext.trim(),
      });
      toast.success("Draft created successfully");
    } catch (error) {
      console.error("Failed to generate breakdown", error);
    } finally {
      setSaveDraftLoading(false);
    }
  };

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

  return (
    <Fragment>
      <Card className={styles.publishDetailsContainer}>
        <div className={styles.editDetails}>
          <Button
            onClick={() =>
              openModal(ChangeDestination, {
                defaultSelected: currentProject,
                onSelect: (project) => {
                  setCurrentProject(project);
                },
              })
            }
            className={styles.changeButton}
          >
            <SvgIcon name="edit" size={14} /> Change
          </Button>
        </div>
        <div className={styles.publishDetails}>
          <div className={styles.jiraProject}>
            <h4>Jira Project</h4>
            <p>
              {currentProject?.jiraConnection?.jiraProjectName} |{" "}
              <span>
                Key : {currentProject?.jiraConnection?.jiraProjectKey}
              </span>
            </p>
          </div>
          <div className={styles.jiraConnection}>
            <div className={styles.connectionStatusIcon}>
              <SvgIcon name="tick" color="rgb(94, 230, 106)" />
            </div>
            <div className={styles.connectionStatus}>
              <h4>Connected</h4>
              <a
                href={`${currentProject?.jiraConnection?.baseUrl}/browse/${currentProject?.jiraConnection?.jiraProjectKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                {currentProject?.jiraConnection?.baseUrl}
                <SvgIcon name="link" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>
            <SvgIcon name="info" />
          </span>
          Breakdown will be published to the Jia project Publish Project (
          {currentProject?.jiraConnection?.jiraProjectKey}) in{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${currentProject?.jiraConnection?.baseUrl}/browse/${currentProject?.jiraConnection?.jiraProjectKey}`}
            className={styles.infoUrl}
          >
            {currentProject?.jiraConnection?.baseUrl}
          </a>
        </div>
      </Card>
      <Card variant="primary" className={styles.breakdownContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Title"
            className={styles.titleInput}
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="e.g. User Authentication System"
            helperText="A short, clear title for this requirement."
          />

          <TextArea
            label="Description"
            className={styles.titleInput}
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Describe the business requirement, goals, and expected outcomes."
            rows={8}
          />

          <TextArea
            label={
              <p className={styles.contextLabelWrapper}>
                Additional Context <span>(Optional)</span>
              </p>
            }
            className={styles.titleInput}
            value={formData.additionalContext}
            onChange={handleChange("additionalContext")}
            placeholder="Architecture notes, dependencies, constraints, Jira links, documentation, etc."
            rows={6}
          />

          <footer className={styles.footer}>
            <Button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting || saveDraftLoading}
            >
              Clear
            </Button>
            <div className={styles.actionGroup}>
              <Button
                disabled={
                  !formData.title.trim() || saveDraftLoading || isSubmitting
                }
                variant="ghost"
                onClick={submitDraft}
              >
                {saveDraftLoading ? <Loader /> : <SvgIcon name="save" />}
                Save draft
              </Button>
              <Button
                type="submit"
                variant="solid"
                disabled={!formData.title.trim() || isSubmitting}
              >
                {isSubmitting ? <Loader /> : <Icon name="breakdown" />} Generate
                Breakdown
              </Button>
            </div>
          </footer>
        </form>
      </Card>
    </Fragment>
  );
};
