import type { ProjectDto } from "../../api/project/project.api";
import { Table, useModal, useTable, type Column } from "../../components";
import { formateDate } from "../../utils/formateDate";
import styles from "./ProjectDashboard.module.scss";
import { useCallback, useMemo } from "react";
import { Button } from "../../components/UI";
import { usePageHeader } from "../../hooks/usePageheader";
import ProjectStatusBadge from "./StatusBadge";
import ProjectCreateWizard from "./ProjectCreate/ProjectCreateWizard";
import SvgIcon from "../../components/Icon/SvgIcon";

interface Props {
  data: ProjectDto[];
}

export const ProjectDashboard = ({ data }: Props) => {
  const { openModal } = useModal();

  const columns: Column<ProjectDto>[] = useMemo(
    () => [
      {
        header: "PROJECT",
        accessor: "name",
      },
      {
        header: "Description",
        accessor: "description",
      },
      {
        header: "Status",
        accessor: "status",
        renderCell: ({ row }) => (
          <span
            className={styles.configureStatus}
            onClick={() =>
              openModal(ProjectCreateWizard, {
                initialStep: row.status == "READY" ? 3 : 2,
                initialData: {
                  projectId: row.id.toString(),
                },
              })
            }
          >
            <ProjectStatusBadge status={row.status} />
          </span>
        ),
      },
      {
        header: "JIRA CONNECTION",
        accessor: "jiraConnections",
      },
      {
        header: "STORIES",
        accessor: "storiesCount",
      },
      {
        header: "Last Updated",
        accessor: "updatedAt",
        renderCell: ({ row }) => {
          const [value, time] = formateDate(row.updatedAt);
          return (
            <>
              <span className={styles.date}>{value}</span>
              <p className={styles.time}>{time}</p>
            </>
          );
        },
      },
    ],
    [],
  );

  const table = useTable<ProjectDto>({
    columns,
    data: data,
    getRowId: (row) => row.createdAt,
  });

  const actions = useCallback(() => {
    return (
      <Button variant="solid" onClick={() => openModal(ProjectCreateWizard)}>
        <SvgIcon name="plus" />
        <p>New Project</p>
      </Button>
    );
  }, []);

  usePageHeader(
    useMemo(
      () => ({
        title: "Projects",
        description: "Manage all your projects and their breakdowns.",
        actions,
      }),
      [],
    ),
  );

  return (
    <div className={styles.wrapper}>
      <Table.Root table={table}>
        <Table.Header />
        <Table.Body />
      </Table.Root>
    </div>
  );
};
