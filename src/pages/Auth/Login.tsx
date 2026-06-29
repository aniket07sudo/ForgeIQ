import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { Input, Button, Card } from "../../components/UI";
import logoUrl from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const toast = useToast();

  const navigate = useNavigate();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className={styles.wrap}>
      <Card variant="secondary" className={styles.card}>
        <div className={styles.brand}>
          <img src={logoUrl} alt="ForgeIQ" />
          <h1>ForgeIQ</h1>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label}>
            Email
            <Input
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="you@company.com"
            />
          </label>
          <label className={styles.label}>
            Password
            <Input
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              placeholder="••••••••"
              type="password"
            />
          </label>
          <div className={styles.actions}>
            <div className={styles.signup}>
              Don't have an account? <br />
              <Link to="/signup">Create one</Link>
            </div>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
