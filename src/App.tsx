import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.scss";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./components/Modal/ModalProvider";
import { ToastProvider } from "./components/toast/ToastProvider";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastProvider>
          <div className={styles.App}>
            <AppRoutes />
          </div>
        </ToastProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
