import { colors } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

const NoBookmarksFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: colors.primary }}>No Bookmarks</Text>
  </View>
);

export default NoBookmarksFound;
