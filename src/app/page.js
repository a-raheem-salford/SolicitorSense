"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useHasMounted from "@/hooks/useHasMounted";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;

    if (user) {
      router.replace("/chat");
    } else {
      router.replace("/login");
    }
  }, [hasMounted, user]);

  return null;
}
