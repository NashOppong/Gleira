import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Loader } from "./Loader";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isSignedIn && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (isSignedIn && inAuthGroup) {
      router.replace("/tabs");
    }
  }, [isLoaded, isSignedIn, segments]);

  // 🚫 Prevent unmatched route flash
  if (!isLoaded && !isSignedIn) {
    return <Loader />;
  }

  // 👇 After Clerk & routing are ready, render your Stack
  return <Stack screenOptions={{ headerShown: false }} />;
}
