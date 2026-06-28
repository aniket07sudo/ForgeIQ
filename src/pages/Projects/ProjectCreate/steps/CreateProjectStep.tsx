import { useEffect, useState, type ChangeEvent } from "react";
import { createProjects } from "../../../../api/project/project.api";
import { Button, Input, TextArea } from "../../../../components/UI";
import styles from "../ProjectCreate.module.scss";
import { Modal, useModal } from "../../../../components";
import { useWizard } from "../Wizard/context";
import Loader from "../../../../assets/loader/loader";

type FormData = {
  name: string;
  description: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  description: "",
};

interface ProjectId {
  projectId: string;
}

export const CreateProjectStep = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const { setFooter, next, setData } = useWizard<ProjectId>();
  const { closeModal } = useModal();

  useEffect(() => {
    setFooter(
      <>
        <Modal.FooterAction align="left" onClick={closeModal.bind(null, this)}>
          <Button>Cancel</Button>
        </Modal.FooterAction>

        <Modal.FooterAction align="right">
          <Button variant="solid" onClick={handleSubmit}>
            {isSubmitting ? <Loader /> : <>Create Project</>}
          </Button>
        </Modal.FooterAction>
      </>,
    );
  }, [formData]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const id = await createProjects({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });

      setData((prev) => ({
        ...prev,
        projectId: id.toString(),
      }));
      next();
    } catch (error) {
      console.error("Failed to generate project", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form}>
      <Input
        label="Project Name"
        className={styles.titleInput}
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="e.g. User Management System"
        helperText="Choose a desctiptive name for your project"
      />
      <TextArea
        label={
          <p className={styles.contextLabelWrapper}>
            Description <span>(Optional)</span>
          </p>
        }
        className={styles.titleInput}
        value={formData.description}
        onChange={handleChange("description")}
        placeholder="Architecture notes, dependencies, constraints, Jira links, documentation, etc."
        rows={6}
      />
    </form>
  );
};
