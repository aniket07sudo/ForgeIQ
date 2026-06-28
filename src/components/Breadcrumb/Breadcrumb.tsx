import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

const formatSegment = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className={styles.breadcrumb}>
        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span>
              <Link to={to}>{formatSegment(segment)}</Link>
            </span>
          );
        })}
    </div>
  );
}
