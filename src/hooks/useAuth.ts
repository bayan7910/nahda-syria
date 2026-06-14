import { useEffect, useState, useCallback } from "react";

export type Role = "affected" | "donor" | "volunteer" | "partner" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

function read(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => read());

  useEffect(() => {
    const sync = () => setUser(read());
    window.addEventListener("storage", sync);
    window.addEventListener("auth:changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:changed", sync);
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("auth:changed"));
    setUser(null);
  }, []);

  return { user, isAuthenticated: !!user, logout };
}