"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!hasMounted) return;

    if (!user) {
      router.replace("/login");
    } else {
      setChecking(false); // Done checking
    }
  }, [hasMounted, user]);

  if (!hasMounted || checking) return null;

  return children;
}
