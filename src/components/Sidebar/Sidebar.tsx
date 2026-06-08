import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import Icon from "../Icon";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={styles.siteSidebar}>
      <div className={styles.brand}>ForgeIQ</div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Icon
                name="dashboard"
                size={16}
                className={styles.itemIcon}
                alt="dashboard"
              />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Icon
                name="projects"
                size={16}
                className={styles.itemIcon}
                alt="projects"
              />
              <span>Projects</span>
            </NavLink>
          </li>
          <li className={styles.treeItem}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="planning-sub"
              className={styles.toggleButton}
              onClick={() => setOpen((s) => !s)}
            >
              <Icon
                name="planning"
                size={16}
                className={styles.itemIcon}
                alt="planning"
              />
              <span
                className={open ? styles.chevOpen : styles.chev}
                aria-hidden
              >
                <Icon
                  name="chevron"
                  size={14}
                  className={open ? styles.chevOpen : styles.chev}
                  alt="chev"
                />
              </span>
              <span>Planning</span>
            </button>
            <ul
              id="planning-sub"
              className={`${styles.tree} ${!open ? styles.collapsed : ""}`}
              aria-hidden={!open}
            >
              <li>
                <NavLink
                  to="/planning/breakdown"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.subItem} ${styles.active}`
                      : styles.subItem
                  }
                >
                  Story Breakdown
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/planning/estimate"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.subItem} ${styles.active}`
                      : styles.subItem
                  }
                >
                  Estimation
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/sprint"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Icon
                name="sprint"
                size={16}
                className={styles.itemIcon}
                alt="sprint"
              />
              <span>Sprint IQ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/releaseNotes"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Icon
                name="releaseNotes"
                size={16}
                className={styles.itemIcon}
                alt="release notes"
              />
              <span>Release Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/integrations"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Icon
                name="integrations"
                size={16}
                className={styles.itemIcon}
                alt="integrations"
              />
              <span>Integrations</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
