import { memo } from "react";
import type { BreakdownStatus } from "../../../../../api/planning/breakdown.api";
import SvgIcon from "../../../../../components/Icon/SvgIcon";
import styles from "./StatusBadge.module.scss";
import { STATUS_CONFIG } from "./statusConfig";

interface StatusProp {
  status: BreakdownStatus;
}

const StatusBadge = ({ status }: StatusProp) => {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={styles.badge}
      style={{ backgroundColor: config?.backgroundColor }}
    >
      <SvgIcon color={config.iconColor} name={config.icon} size={16} />
      <span style={{ color: config.textColor }}>{config.label}</span>
    </div>
  );
};

export default memo(StatusBadge);
