import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../assets/loader/loader";
import { useCallback, useEffect } from "react";

export default function DemoLogin() {
  const { demoSignin } = useAuth();
  const navigate = useNavigate();

  const onLogin = useCallback(async function onLogin() {
    try {
      await demoSignin();
      navigate("/");
    } catch (err) {}
  }, []);

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <div className={styles.wrap}>
      <Loader color="#fff" size={100} />
    </div>
  );
}
