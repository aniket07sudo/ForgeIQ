import type { ProjectStatus } from "../../api/project/project.api";
import type { SVGIcons } from "../../components/Icon/SvgIcon";

export const PROJECT_BADGES: Record<
  ProjectStatus,
  {
    label: string;
    icon: SVGIcons;
    iconColor: string;
    textColor: string;
    backgroundColor: string;
  }
> = {
  READY: {
    label: "Ready",
    icon: "tick",
    iconColor: "#5EE66A",
    textColor: "#5EE66A",
    backgroundColor: "rgba(94,230,106,0.12)",
  },

  CONNECT_JIRA: {
    label: "Connect Jira",
    icon: "jira",
    textColor: "#F6A623",
    iconColor: "#F6A623",
    backgroundColor: "rgba(246,166,35,0.12)",
  },

  SELECT_JIRA_PROJECT: {
    label: "Select Jira Project",
    icon: "jira",
    iconColor: "#4094FF",
    textColor: "#4094FF",
    backgroundColor: "rgba(64,148,255,0.12)",
  },
} as const;
