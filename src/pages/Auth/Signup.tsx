import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";
import { Input, Button, Card } from "../../components/UI";
import logoUrl from "../../assets/images/Logo.png";
import { useAuth } from "../../context/AuthContext";
import { signup } from "../../api/auth/auth.api";
import { useToast } from "../../components";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [form, setForm] = useState<SignupForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const navigate = useNavigate();
  const { login } = useAuth();

  const updateField = useCallback(
    (field: keyof SignupForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    [],
  );

  const validate = useCallback(() => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  }, [form]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError("");

      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        setLoading(true);
        await signup({
          email: form.email,
          name: form.name,
          password: form.password,
        });
        // auto login
        await login(form.email, form.password);

        navigate("/");
      } catch (err: any) {
        toast.error("Something went wrong");
        setError(
          err?.response?.data?.message || "Signup failed. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [form, navigate, validate],
  );

  return (
    <div className={styles.wrap}>
      <Card variant="secondary" className={styles.card}>
        <div className={styles.brand}>
          <img src={logoUrl} alt="ForgeIQ" />
          <h1>ForgeIQ</h1>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label}>
            Full name
            <Input
              value={form.name}
              onChange={updateField("name")}
              placeholder="Your name"
            />
          </label>

          <label className={styles.label}>
            Email
            <Input
              value={form.email}
              onChange={updateField("email")}
              placeholder="you@company.com"
            />
          </label>

          <label className={styles.label}>
            Password
            <Input
              value={form.password}
              onChange={updateField("password")}
              placeholder="••••••••"
              type="password"
            />
          </label>

          <label className={styles.label}>
            Confirm password
            <Input
              value={form.confirmPassword}
              onChange={updateField("confirmPassword")}
              placeholder="••••••••"
              type="password"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
