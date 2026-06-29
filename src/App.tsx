import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.scss";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./components/Modal/ModalProvider";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <div className={styles.App}>
          <AppRoutes />
        </div>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
