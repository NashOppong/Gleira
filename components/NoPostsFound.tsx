import { colors } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: colors.primary }}>No posts yet</Text>
  </View>
);

export default NoPostsFound;
