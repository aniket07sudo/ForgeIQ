import { useEffect, useState, type ChangeEvent } from "react";
import { Modal } from "../../../../components";
import { useWizard } from "../Wizard/context";
import { Button, Input } from "../../../../components/UI";
import styles from "../ProjectCreate.module.scss";
import { connectJira } from "../../../../api/project/project.api";

export interface JiraConnectionForm {
  siteUrl: string;
  email: string;
  apiToken: string;
}

const InitialForm = {
  siteUrl: "",
  email: "",
  apiToken: "",
};

export const ConnectJiraStep = () => {
  const [form, setForm] = useState<JiraConnectionForm>(InitialForm);
  const { setFooter, next, prev, data } = useWizard<{ projectId: string }>();

  useEffect(() => {
    setFooter(
      <>
        <Modal.FooterAction align="left" onClick={prev}>
          <Button>Back</Button>
        </Modal.FooterAction>

        <Modal.FooterAction align="right">
          <Button variant="solid" onClick={handleSubmit}>
            Test Connection
          </Button>
        </Modal.FooterAction>
      </>,
    );
  }, [form]);

  const handleChange =
    (field: keyof JiraConnectionForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async () => {
    try {
      await connectJira(data.projectId, {
        apiToken: form.apiToken,
        baseUrl: form.siteUrl,
        email: form.email,
        name: "Anni",
      });
      next();
    } catch (error) {
      console.error("Failed to generate project", error);
    } finally {
      // setIsSubmitting(false);
    }
  };

  return (
    <Modal.Content>
      <div className={styles.form}>
        <Input
          label="Jira Site URL"
          className={styles.titleInput}
          value={form.siteUrl}
          onChange={handleChange("siteUrl")}
          placeholder="Enter your Jira cloud instance URL"
          subLabel="Choose a desctiptive name for your project"
        />
        <Input
          label="Email"
          subLabel="Enter the email associated with your Jira account"
          className={styles.titleInput}
          onChange={handleChange("email")}
          value={form.email}
          placeholder="Architecture notes, dependencies, constraints, Jira links, documentation, etc."
        />

        <Input
          label="API Token"
          subLabel="Enter your Jira API Token"
          type="password"
          className={styles.titleInput}
          onChange={handleChange("apiToken")}
          value={form.apiToken}
          placeholder="Architecture notes, dependencies, constraints, Jira links, documentation, etc."
        />
      </div>
    </Modal.Content>
  );
};
