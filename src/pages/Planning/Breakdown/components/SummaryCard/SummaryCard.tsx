import SvgIcon, {
  type SVGIcons,
} from "../../../../../components/Icon/SvgIcon";
import { Card } from "../../../../../components/UI";
import styles from "./SummaryCard.module.scss";

interface SummaryItem {
  label: string;
  value: number;
  icon: SVGIcons;
  iconColor: string;
  backgroundColor: string;
}

interface SummaryCardProps {
  items: SummaryItem[];
}

export const SummaryCard = ({
  items,
}: SummaryCardProps) => {
  return (
    <Card
      variant="secondary"
      className={styles.breakdownCard}
    >
      {items.map(
        ({
          label,
          value,
          icon,
          iconColor,
          backgroundColor,
        }) => (
          <div key={label} className={styles.breakdownItem}>
            <div
              className={styles.iconWrapper}
              style={{
                backgroundColor,
              }}
            >
              <SvgIcon
                name={icon}
                size={20}
                color={iconColor}
              />
            </div>

            <div className={styles.breakdownItemContent}>
              <span>{value}</span>
              <p>{label}</p>
            </div>
          </div>
        )
      )}
    </Card>
  );
};