import styles from "./Header.module.scss";
import { Button } from "../UI";
import Icon from "../Icon";
import BreadCrumb from "../Breadcrumb/Breadcrumb";

export function Header() {
  return (
    <header className={styles.header}>
      <BreadCrumb />
      <div className={styles.actions} aria-hidden>
        <Button
          variant="glass"
          size="sm"
          className={styles.actionBtn}
          aria-label="Notifications"
        >
          <Icon name="bell" size={16} alt="notifications" />
        </Button>
        <Button
          variant="glass"
          size="sm"
          className={styles.actionBtn}
          aria-label="Account"
        >
          <Icon name="user" size={16} alt="account" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
