import styles from "./BreakdownDashboard.module.scss";
import {
  type Breakdown,
  type BreakdownItem,
} from "../../../../api/planning/breakdown.api";
import { getStats } from "./getStats";
import { Table, useTable, type Column } from "../../../../components";
import { StatCard } from "../../../../components/UI/StatCard";
import { formateDate } from "../../../../utils/formateDate";
import { useNavigate } from "react-router-dom";
import { usePageHeader } from "../../../../hooks/usePageheader";
import { Button } from "../../../../components/UI";
import SvgIcon from "../../../../components/Icon/SvgIcon";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import { useCallback, useMemo } from "react";

interface Props {
  data: Breakdown;
}
const columns: Column<BreakdownItem>[] = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Status",
    accessor: "breakdownStatus",
    renderCell: ({ row }) => <StatusBadge status={row.breakdownStatus} />,
  },
  {
    header: "Project",
    accessor: "projectName",
  },
  {
    header: "Additional Context",
    accessor: "additionalContext",
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
];

export const BreakdownDashboard = ({ data }: Props) => {
  const stats = getStats(data.summary);
  const navigate = useNavigate();

  const _navigateToNewBreakdown = () => {
    navigate({
      pathname: "/planning/breakdown/generate",
    });
  };

  const table = useTable<BreakdownItem>({
    columns,
    data: data.table.items,
    getRowId: (row) => row.breakdownId,
    onRowClick: (row) => {
      navigate({
        pathname: `/planning/breakdown/${row.breakdownId}`,
      });
    },
  });

  const actions = useCallback(() => {
    return (
      <Button variant="solid" onClick={_navigateToNewBreakdown}>
        <SvgIcon name="plus" />
        <p>New Breakdown</p>
      </Button>
    );
  }, [_navigateToNewBreakdown]);

  usePageHeader(
    useMemo(
      () => ({
        title: "Breakdown",
        description:
          "Break down user stories into smaller actionable subtasks with AI.",
        actions,
      }),
      [],
    ),
  );

  return (
    <div className={styles.wrapper}>
      <section className={styles.summary}>
        {stats.map((stat) => (
          <StatCard {...stat} />
        ))}
      </section>
      <Table.Root table={table}>
        <Table.Header />
        <Table.Body />
      </Table.Root>
    </div>
  );
};
