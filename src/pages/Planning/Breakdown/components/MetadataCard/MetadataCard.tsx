import { Card } from "../../../../../components/UI";
import type { MetadataItem } from "../../BreakdownDetails/config";
import styles from "./MetadataCard.module.scss";

interface MetadataCardProps {
  items: MetadataItem[];
}

export const MetadataCard = ({ items }: MetadataCardProps) => {
  return (
    <Card className={styles.metaDataCard}>
      {items.map(({ label, value }) => (
        <div key={label} className={styles.metaDataItem}>
          <span>{label}</span>
          <p>{value}</p>
        </div>
      ))}
    </Card>
  );
};
