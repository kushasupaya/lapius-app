"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useAuthRedirect(autoRedirect = true): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true); // Wait for client-side rendering to complete
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const token = localStorage.getItem("authToken");

    if (!token || isTokenExpired(token)) {
      // Token is missing or expired
      if (token) {
        localStorage.removeItem("authToken");
        toast({
          title: "Session expired",
          variant: "destructive",
          description: "Please log in again",
        });
      }

      if (autoRedirect) {
        router.push("/"); // Ensure this path points to your correct landing page
      }
    } else {
      // Token is valid, user is authenticated
      setIsAuthenticated(true);
    }
  }, [hydrated, router, autoRedirect]);

  return isAuthenticated;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true; // Treat malformed tokens as expired
  }
}
