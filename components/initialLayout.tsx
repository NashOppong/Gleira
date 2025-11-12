import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !segments[0]) return;

    const inAuthScreen = segments[0] === "auth"; // ✅ must include parentheses

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/auth/login"); // ✅ must match folder
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/tabs");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default InitialLayout;
