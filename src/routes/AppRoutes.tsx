import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Breakdown from "../pages/Planning/Breakdown";
import Estimate from "../pages/Planning/Estimate";
import Sprint from "../pages/Sprint";
import NotFound from "../pages/NotFound";
import ReleaseNotes from "../pages/ReleaseNotes";
import Integrations from "../pages/Integrations";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/planning/breakdown" element={<Breakdown />} />
      <Route path="/planning/estimate" element={<Estimate />} />
      <Route path="/sprint" element={<Sprint />} />
      <Route path="/releaseNotes" element={<ReleaseNotes />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
