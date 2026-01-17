import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login: AuthContextType["login"] = (newToken) => {
    setToken(newToken);
  };

  const logout: AuthContextType["logout"] = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
