"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Load user from localStorage on first load
  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined";
    if (isBrowser) {
      const storedUser = localStorage.getItem("user") || null;
      console.log("storedUser", storedUser, !!storedUser);

      if (storedUser) {
        setUser(JSON?.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  console.log("user", user);

  const loginContext = (data) => {
    console.log("data", data);

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/chat");
  };

  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
