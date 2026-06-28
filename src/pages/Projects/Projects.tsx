import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjects, type ProjectDto } from "../../api/project/project.api";
import { ProjectDashboard } from "./ProjectDashboard";

const ProjectsPage = () => {
  const { data } = useSuspenseQuery<ProjectDto[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime:0,
    gcTime:0
  });

  return <ProjectDashboard data={data} />;
};

export default ProjectsPage;
