import { colors } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
export function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
