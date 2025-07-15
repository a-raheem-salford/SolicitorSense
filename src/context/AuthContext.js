"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionID] = useState(null);
  const router = useRouter();

  // ✅ Load user from localStorage on first load
  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined";
    if (isBrowser) {
      const storedUser = localStorage.getItem("user") || null;
      const storedSessionId = localStorage.getItem("sessionId") || null;
      console.log("storedSessionId", storedSessionId);

      if (storedUser) {
        setUser(JSON?.parse(storedUser));
      }
      if (storedSessionId) {
        setSessionID(JSON?.parse(storedSessionId));
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

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
    } else {
      localStorage.removeItem("sessionId");
    }
  }, [sessionId]);

  const loginContext = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/chat");
  };

  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const setSessionId = (sessionId) => {
    setSessionID(sessionId);
    localStorage.setItem("sessionId", sessionId);
  };

  const removeSessionId = () => {
    setSessionID(null);
    localStorage.removeItem("sessionId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginContext,
        logoutContext,
        setSessionId,
        removeSessionId,
        sessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
