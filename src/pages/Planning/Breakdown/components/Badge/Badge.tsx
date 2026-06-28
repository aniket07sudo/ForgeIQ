import SvgIcon from "../../../../../components/Icon/SvgIcon";
import styles from "./Badge.module.scss";

interface BadgeProps {
  label: string;
  icon: any;
  backgroundColor: string;
  textColor: string;
  iconColor?: string;
}

export const Badge = ({
  label,
  icon,
  backgroundColor,
  textColor,
  iconColor,
}: BadgeProps) => (
  <div className={styles.badge} style={{ backgroundColor }}>
    <SvgIcon name={icon} color={iconColor ?? textColor} size={16} />
    <span style={{ color: textColor }}>{label}</span>
  </div>
);
