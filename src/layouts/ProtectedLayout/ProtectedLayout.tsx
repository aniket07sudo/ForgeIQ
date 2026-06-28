import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./ProtectedLayout.module.scss";
import type { NavItem } from "../../config/navRoutes";
import { useState } from "react";
import {
  DEFAULT_PAGE_HEADER,
  type PageHeaderConfig,
} from "../../hooks/usePageheader";

const findActiveRoute = (
  routes: NavItem[],
  currentPath: string,
): NavItem | null => {
  for (const route of routes) {
    if (route.path === currentPath) return route;
    if (route.children) {
      const match = findActiveRoute(route.children, currentPath);
      if (match) return match;
    }
  }
  return null;
};

export default function ProtectedLayout() {
  const [pageHeader, setPageHeader] =
    useState<PageHeaderConfig>(DEFAULT_PAGE_HEADER);

  return (
    <div className={styles.contentArea}>
      <Sidebar />
      <Header />
      <div className={styles.pages}>
        <section>
          <div className={styles.headerContent}>
            {typeof pageHeader.title === "function" ? pageHeader.title() : <h2>{pageHeader.title}</h2>}
            {pageHeader?.description && (
              <p className={styles.description}>{pageHeader.description}</p>
            )}
          </div>
          {pageHeader.actions && (
            <div className={styles.actions}>{pageHeader.actions()}</div>
          )}
        </section>
        <Outlet context={{ setPageHeader }} />
      </div>
    </div>
  );
}
