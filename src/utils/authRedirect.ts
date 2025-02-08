"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export function useAuthRedirect(autoRedirect = true): boolean {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      toast({
        title: "Session expired",
        variant: "destructive",
        description: "Please log in again",
      });

      if (autoRedirect) {
        router.push("/");
      }
    }
  }, [router, token, autoRedirect]);

  return !!token && !isTokenExpired(token);
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}
