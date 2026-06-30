import { createContext, useContext, useEffect, useState } from "react";
import { getToken, TOKEN_KEY } from "../utils/auth";
import { demoLogin, getMe, signin, type User } from "../api/auth/auth.api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => void;
  demoSignin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res);
    } catch (err) {}
  };

  /**
   * 🔥 Run once on app load
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      await fetchUser();
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await signin({ email, password });

    localStorage.setItem(TOKEN_KEY, accessToken);

    const user = await getMe();
    setUser(user);
  };

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const demoSignin = async () => {
    const { accessToken } = await demoLogin({
      email: "demo@forgeiq.com",
      password: "12",
    });

    localStorage.setItem(TOKEN_KEY, accessToken);

    const user = await getMe();
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        login,
        logout,
        demoSignin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used insude AuthProvider");
  return ctx;
};
