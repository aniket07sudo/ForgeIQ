import type { Breakdown } from "../../../../api/planning/breakdown.api";
import type { SVGIcons } from "../../../../components/Icon/SvgIcon";

type StatCardConfig = {
  key: string;
  title: string;
  value: number;
  hint: string;
  icon: SVGIcons;
  iconColor: string;
  backgroundColor: string;
};

export const getStats = (summary: Breakdown["summary"]): StatCardConfig[] => [
  {
    key: "all",
    title: "All Breakdowns",
    value: summary.totalBreakdown,
    hint: "Total breakdowns",
    icon: "document",
    iconColor: "#B26BFF",
    backgroundColor: "rgba(178, 107, 255, 0.15)",
  },
  {
    key: "draft",
    title: "Drafts",
    value: summary.drafts,
    hint: "Saved drafts",
    icon: "draft",
    iconColor: "#4094FF",
    backgroundColor: "rgba(64, 148, 255, 0.15)",
  },
  {
    key: "generated",
    title: "Generated",
    value: summary.generated,
    hint: "AI generated",
    icon: "ai",
    iconColor: "#F6A623",
    backgroundColor: "rgba(246, 166, 35, 0.15)",
  },
  {
    key: "synced",
    title: "Jira Synced",
    value: summary.jiraSynced,
    hint: "Successfully synced",
    icon: "tick",
    iconColor: "#5EE66A",
    backgroundColor: "rgba(94, 230, 106, 0.15)",
  },
  {
    key: "outOfSync",
    title: "Out of Sync",
    value: summary.outOfSync,
    hint: "Requires attention",
    icon: "sync",
    iconColor: "#FF5A3D",
    backgroundColor: "rgba(255, 90, 61, 0.15)",
  },
];
