import { Loader } from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  //
  const post = useQuery(api.posts.getFeedPost);
  if (post === undefined) return <Loader />;
  if (Post.length === 0) return <NoPostsFound />;

  return (
    <ScrollView style={{ backgroundColor: colors.background, flexGrow: 1 }}>
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

        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
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
        </ScrollView>
        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {post.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

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
