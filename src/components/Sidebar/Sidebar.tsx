import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import logoUrl from "../../assets/images/Logo.png";
import Icon from "../Icon";
import navRoutes from "../../config/navRoutes";

export default function Sidebar() {
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({
    planning: true,
  });

  function toggle(key: string) {
    setOpenKeys((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <aside className={styles.siteSidebar}>
      <div className={styles.logoSection}>
        <div className={styles.brandLogo}>
          <img src={logoUrl} alt="ForgeIQ Logo" />
        </div>
        <div className={styles.logoText}>
          <h1>ForgeIQ</h1>
          <p>SPRINT COPILOT</p>
        </div>
      </div>
      <nav>
        <ul>
          {navRoutes.map((item) => (
            <li
              key={item.key}
              className={item.children ? styles.treeItem : undefined}
            >
              {!item.children ? (
                <NavLink
                  to={item.path ?? "#"}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon as any}
                      size={16}
                      className={styles.itemIcon}
                      alt={item.icon}
                    />
                  )}
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <>
                  <button
                    type="button"
                    aria-expanded={!!openKeys[item.key]}
                    aria-controls={`${item.key}-sub`}
                    className={styles.toggleButton}
                    onClick={() => toggle(item.key)}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon as any}
                        size={16}
                        className={styles.itemIcon}
                        alt={item.icon}
                      />
                    )}
                    <span className={styles.label}>{item.label}</span>
                    <span
                      className={
                        openKeys[item.key] ? styles.chevOpen : styles.chev
                      }
                      aria-hidden
                    >
                      <Icon
                        name="chevron"
                        size={14}
                        className={styles.chevIcon}
                        alt="chev"
                      />
                    </span>
                  </button>

                  <ul
                    id={`${item.key}-sub`}
                    className={`${styles.tree} ${!openKeys[item.key] ? styles.collapsed : ""}`}
                    aria-hidden={!openKeys[item.key]}
                  >
                    {item.children
                      ?.filter((item) => !item.hidden)
                      .map((c) => (
                        <li key={c.key}>
                          <NavLink
                            to={c.path ?? "#"}
                            className={({ isActive }) =>
                              isActive
                                ? `${styles.subItem} ${styles.active}`
                                : styles.subItem
                            }
                          >
                            {c.icon && (
                              <Icon
                                name={c.icon as any}
                                size={14}
                                className={styles.itemIcon}
                                alt={c.icon}
                              />
                            )}
                            <span>{c.label}</span>
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
