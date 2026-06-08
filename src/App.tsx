import styles from "./App.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.contentArea}>
        <Sidebar />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;