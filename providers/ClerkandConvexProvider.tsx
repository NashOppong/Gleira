import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import React from "react";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
const ClerkAndConvexProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ClerkAndConvexProvider;
