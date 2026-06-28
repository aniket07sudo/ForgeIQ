import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Sprint from "../pages/Sprint";
import ReleaseNotes from "../pages/ReleaseNotes";
import Integrations from "../pages/Integrations";
import { BreakdownGenerate } from "../pages/Planning/Breakdown/BreakdownGenerate/BreakdownGenerate";
import { Breakdown } from "../pages/Planning/Breakdown";
import { BreakdownDetails } from "../pages/Planning/Breakdown/BreakdownDetails";
import Estimate from "../pages/Planning/Estimate";

export type NavItem = {
  key: string;
  label: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
  component?: any;
  hidden?: boolean;
  heading?: string;
  subText?: string;
};

const navRoutes: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: "dashboard",
    component: Dashboard,
    heading: "Dashboard",
    subText:
      "Break down user stories into smaller actionable subtasks with AI.",
  },
  {
    key: "projects",
    label: "Projects",
    path: "/projects",
    icon: "projects",
    component: Projects,
    heading: "Projects",
    subText:
      "Break down user stories into smaller actionable subtasks with AI.",
  },
  {
    key: "planning",
    label: "Planning",
    icon: "planning",
    children: [
      {
        key: "breakdown",
        label: "Breakdown",
        path: "/planning/breakdown",
        icon: "breakdown",
        component: Breakdown,
        heading: "Breakdown",
        subText:
          "Break down user stories into smaller actionable subtasks with AI.",
      },
      {
        key: "estimate",
        label: "Estimate",
        path: "/planning/estimate",
        icon: "estimate",
        component: Estimate,
        heading: "Breakdown",
        subText:
          "Break down user stories into smaller actionable subtasks with AI.",
      },
      {
        key: "story",
        label: "story",
        path: "/planning/breakdown/generate",
        hidden: true,
        component: BreakdownGenerate,
        heading: "Enter Requirement",
        subText:
          "Describe the requirement in detail. the more context you provide, better the output",
      },
      {
        key: "breakdown",
        label: "story",
        path: "/planning/breakdown/:breakdownId",
        hidden: true,
        component: BreakdownDetails,
        heading: "Enter Requirement",
        subText:
          "Describe the requirement in detail. the more context you provide, better the output",
      },
    ],
  },
  {
    key: "sprint",
    label: "Sprint IQ",
    path: "/sprint",
    icon: "sprint",
    component: Sprint,
    heading: "Breakdown",
    subText:
      "Break down user stories into smaller actionable subtasks with AI.",
  },
  {
    key: "releaseNotes",
    label: "Release Notes",
    path: "/releaseNotes",
    component: ReleaseNotes,
    heading: "Breakdown",
    subText:
      "Break down user stories into smaller actionable subtasks with AI.",
  },
  {
    key: "integrations",
    label: "Integrations",
    path: "/integrations",
    component: Integrations,
    heading: "Breakdown",
    subText:
      "Break down user stories into smaller actionable subtasks with AI.",
  },
];

export default navRoutes;
