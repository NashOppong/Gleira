import { colors } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const profile = () => {
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
};

export default profile;
