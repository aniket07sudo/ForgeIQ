import styles from "./Skeleton.module.scss";

export const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      {/* Header */}
      <div className={styles.header} />

      {/* Summary cards */}
      <div className={styles.summary}>
        <div className={styles.card} />
        <div className={styles.card} />
        <div className={styles.card} />
        <div className={styles.card} />
      </div>

      {/* Table rows */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.row} />
      ))}
    </div>
  );
};