import PostFlatList from "@/components/postflatlist";
import Story from "@/components/Story";
import { colors } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={{ backgroundColor: colors.background, flexGrow: 1 }}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gleira</Text>
          <Ionicons
            name="leaf"
            size={24}
            color={colors.primary}
            style={styles.logo}
          />
          <TouchableOpacity onPress={() => "handleSearch"}>
            <Ionicons name="search-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View
          style={{ marginTop: 10 }}
          //showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: colors.white,
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            Stories
          </Text>
          <Story />
        </View>
        <View
          style={{ marginTop: 5 }}
          //showsVerticalScrollIndicator={false}
          //scrollEnabled
        >
          <PostFlatList />
        </View>
      </View>
    </View>
  );
}
