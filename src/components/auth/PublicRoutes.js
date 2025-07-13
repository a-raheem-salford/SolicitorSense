"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";

export default function PublicRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!hasMounted) return;

    if (user) {
      router.replace("/chat");
    } else {
      setChecking(false);
    }
  }, [hasMounted, user]);

  if (!hasMounted || checking) return null;

  return children;
}
