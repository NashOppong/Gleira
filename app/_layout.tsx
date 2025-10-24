import InitialLayout from "@/components/initialLayout";
import { colors } from "@/constants/theme";
import ClerkAndConvexProvider from "@/providers/ClerkandConvexProvider";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
