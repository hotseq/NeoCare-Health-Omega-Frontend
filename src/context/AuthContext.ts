import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  name?: string;
};

export type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
