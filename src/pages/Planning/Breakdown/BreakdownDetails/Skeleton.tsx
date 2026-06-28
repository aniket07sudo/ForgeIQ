import { Card } from "../../../../components/UI";
import styles from "./BreakdownSkeleton.module.scss";

export const BreakdownDetailsSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.metaDataCard}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.metaDataItem}>
            <div className={styles.labelSkeleton} />
            <div className={styles.valueSkeleton} />
          </div>
        ))}
      </Card>

      <Card variant="secondary" className={styles.breakdownCard}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.breakdownItem}>
            <div className={styles.iconSkeleton} />

            <div className={styles.breakdownItemContent}>
              <div className={styles.countSkeleton} />
              <div className={styles.textSkeleton} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
