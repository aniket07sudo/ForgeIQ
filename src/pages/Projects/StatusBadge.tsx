import type { ProjectStatus } from "../../api/project/project.api";
import { Badge } from "../Planning/Breakdown/components/Badge/Badge";
import { PROJECT_BADGES } from "./config";

interface ProjectStatusProps {
  status: ProjectStatus;
}

const ProjectStatusBadge = ({ status }: ProjectStatusProps) => {
  const config = PROJECT_BADGES[status];
  return <Badge {...config} />;
};

export default ProjectStatusBadge;
