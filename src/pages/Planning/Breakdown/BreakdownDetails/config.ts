import type { BreakdownDetailResponse } from "../../../../api/planning/breakdown.api";
import type { SVGIcons } from "../../../../components/Icon/SvgIcon";
import { formateDate } from "../../../../utils/formateDate";

export interface MetadataItem {
  label: string;
  value: string | string[];
}

export interface SummaryItem {
  label: string;
  value: number;
  icon: SVGIcons;
  backgroundColor: string;
  iconColor: string;
}

export const getMetadata = (data: BreakdownDetailResponse): MetadataItem[] => [
  {
    label: "Project",
    value: data.project?.name ?? "-",
  },
  {
    label: "Project By",
    value: data?.createdBy ?? "-",
  },
  {
    label: "Created On",
    value: formateDate(data.createdAt)?.[0] ?? "-",
  },
  {
    label: "Last Updated",
    value: formateDate(data.updatedAt)?.[0] ?? "-",
  },
];

export const getSummary = (data: BreakdownDetailResponse): SummaryItem[] => [
  {
    label: "Epics",
    value: data.epicsCount,
    icon: "epic",
    iconColor: "#F6A623",
    backgroundColor: "rgba(246, 166, 35, 0.15)",
  },
  {
    label: "Stories",
    value: data.storiesCount,
    icon: "story",
    iconColor: "#4094FF",
    backgroundColor: "rgba(64, 148, 255, 0.15)",
  },
  {
    label: "Story Points",
    value: data.totalStoryPoints,
    icon: "SP",
    iconColor: "#76A0D8",
    backgroundColor: "rgb(118, 160, 216, 0.16)",
  },
  {
    label: "Technical Tasks",
    value: data.technicalTasksCount,
    icon: "technicalTask",
    iconColor: "#8B5CF6",
    backgroundColor: "rgba(139, 92, 246, 0.14)",
  },
];
