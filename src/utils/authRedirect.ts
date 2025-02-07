"use client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function isTokenExpired(token: any) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    console.log(currentTime);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // If token is malformed, consider it expired
  }
}

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Redirect to login if token is missing or expired
    if (!token || isTokenExpired(token)) {
      router.push("/");
      toast({
        title: "Session expired",
        variant: "destructive",
        description: "Please log in again",
      });
    }
  }, [router]);
}
