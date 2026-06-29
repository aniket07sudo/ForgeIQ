import {
  BreakdownStatus,
  publishBreakdown,
  type BreakdownDetailResponse,
} from "../../../../api/planning/breakdown.api";
import { getMetadata, getSummary } from "./config";
import styles from "./Breakdown.module.scss";
import { MetadataCard } from "../components/MetadataCard/MetadataCard";
import { SummaryCard } from "../components/SummaryCard/SummaryCard";
import { usePageHeader } from "../../../../hooks/usePageheader";
import { ScrollSpy, useToast } from "../../../../components";
import { useAvailableHeight } from "../../../../hooks/useAvailableHeight";
import { Button } from "../../../../components/UI";
import { useParams } from "react-router-dom";
import SvgIcon from "../../../../components/Icon/SvgIcon";
import { useCallback, useMemo, useState } from "react";
import Loader from "../../../../assets/loader/loader";
import StatusBadge from "../components/StatusBadge/StatusBadge";

interface Props {
  data: BreakdownDetailResponse;
}

export const BreakdownDetailsView = ({ data }: Props) => {
  const metadata = getMetadata(data);
  const summary = getSummary(data);

  const toast = useToast();

  const [isPublishing, setIsPublishing] = useState(false);

  const { breakdownId } = useParams<{ breakdownId: string }>();

  const { ref, availableHeight } = useAvailableHeight({
    offset: 32,
  });

  const handlePublish = useCallback(async () => {
    if (!breakdownId) {
      return;
    }

    try {
      setIsPublishing(true);

      const { epicsCreated, storiesCreated, subtasksCreated } =
        await publishBreakdown(Number(breakdownId));
      toast.success(
        `Published ${epicsCreated} epic, ${storiesCreated} stories, and ${subtasksCreated} tasks Successfully`,
      );
    } catch (error) {
      console.error("Failed to publish breakdown", error);
      toast.error("Something went wrong");
      // TODO:
      // showErrorToast("Unable to push breakdown to Jira");
    } finally {
      setIsPublishing(false);
    }
  }, [breakdownId]);

  const pageHeader = useMemo(
    () => ({
      title: () => (
        <div className={styles.titleContainer}>
          <h2>{data.title}</h2>
          <StatusBadge status={data.status} />
        </div>
      ),
      description: data.description,
      actions: () => {
        if (data.status == BreakdownStatus.DRAFT) {
          return <></>;
        }

        if (data.status == BreakdownStatus.SYNCED) {
          return (
            <Button
              onClick={() =>
                window.open(data.breakdownUrl, "_blank", "noopener,noreferrer")
              }
              variant="solid"
            >
              {isPublishing ? <Loader /> : <SvgIcon name="link" />}
              <p>Open in Jira</p>
            </Button>
          );
        }
        return (
          <Button onClick={handlePublish} variant="solid">
            {isPublishing ? <Loader /> : <SvgIcon name="jira" />}
            <p>Push to Jira</p>
          </Button>
        );
      },
    }),
    [data.title, data.description, handlePublish, isPublishing],
  );

  usePageHeader(pageHeader);

  return (
    <div className={styles.wrapper}>
      <MetadataCard items={metadata} />
      <SummaryCard items={summary} />
      <ScrollSpy.Container
        ref={ref}
        style={{ maxHeight: availableHeight, position: "relative" }}
      >
        <ScrollSpy.Root>
          <ScrollSpy.Nav className={styles.nav}>
            <ScrollSpy.Tab id="overview">Overview</ScrollSpy.Tab>
            <ScrollSpy.Tab id="epics">Epics</ScrollSpy.Tab>
            <ScrollSpy.Tab id="stories">Stories</ScrollSpy.Tab>
            <ScrollSpy.Tab id="technical_tasks">Technical Tasks</ScrollSpy.Tab>
          </ScrollSpy.Nav>
          <ScrollSpy.Content>
            <ScrollSpy.Section id="overview">
              <p style={{ height: 300 }}>Overview</p>
            </ScrollSpy.Section>
            <ScrollSpy.Section id="epics">
              <p style={{ height: 300 }}>Epics</p>
            </ScrollSpy.Section>
            <ScrollSpy.Section id="stories">
              <p style={{ height: 300 }}>Stories</p>
            </ScrollSpy.Section>
            <ScrollSpy.Section id="technical_tasks">
              <p style={{ height: 300 }}>Technical Tasks</p>
            </ScrollSpy.Section>
          </ScrollSpy.Content>
        </ScrollSpy.Root>
      </ScrollSpy.Container>
    </div>
  );
};
