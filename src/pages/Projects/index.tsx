import { Suspense } from "react";
import ProjectsPage from "./Projects";
import { Skeleton } from "../../components/Skeleton/Skeleton";

const Projects = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectsPage />
    </Suspense>
  );
};

export default Projects;
