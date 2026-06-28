import SvgIcon, { type SVGIcons } from "../Icon/SvgIcon";
import Card from "./Card";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  title: string;
  value: number;
  hint: string;
  icon: SVGIcons;
  iconColor: string;
  backgroundColor: string;
};

export const StatCard = ({
  title,
  value,
  hint,
  icon,
  iconColor,
  backgroundColor,
}: StatCardProps) => (
  <Card className={styles.statCard}>
    <div className={styles.statIconWrapper} style={{ backgroundColor }}>
      <SvgIcon name={icon} size={30} color={iconColor} />
    </div>

    <div className={styles.statContent}>
      <p className={styles.statTitle}>{title}</p>
      <h3 className={styles.statValue}>{value}</h3>
      <p className={styles.hint}>{hint}</p>
    </div>
  </Card>
);
