import { colors } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
export default function Index() {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: "white" }}>Signout...</Text>
      </TouchableOpacity>
    </View>
  );
}
