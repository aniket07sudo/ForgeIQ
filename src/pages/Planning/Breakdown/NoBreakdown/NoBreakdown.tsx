import { useNavigate } from "react-router-dom";
import EmptyBreakdown from "../../../../assets/images/EmptyBreakdown.svg?react";
import Icon from "../../../../components/Icon";
import { Button, Card } from "../../../../components/UI";
import styles from "./NoBreakdown.module.scss";

export const NoBreakdown = () => {
  const navigate = useNavigate();

  const navigateToBreakdown = () => {
    navigate({
      pathname: "/planning/breakdown/generate",
    });
  };

  return (
    <Card variant="primary" className={styles.breakdownContainer}>
      <div className={styles.createBreakdown}>
        <div className={styles.illustrationContainer}>
          <EmptyBreakdown />
        </div>
        <div className={styles.noStoryBreakdown}>
          <h2>No story breakdowns yet</h2>
          <p>
            Breakdown requirements into structured epics, stories, and tasks
            using AI. Review, estimate and push to Jira with one click.
          </p>
        </div>
        <Button
          variant="solid"
          className={styles.cta}
          onClick={navigateToBreakdown}
        >
          <Icon name="plus" /> <p>Create Your First Breakdown</p>
        </Button>
      </div>
    </Card>
  );
};
