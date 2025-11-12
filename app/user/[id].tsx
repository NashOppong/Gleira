import { Loader } from "@/components/Loader";
import NoPostsFound from "@/components/NoPostsFound";
import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

type Post = {
  _id: Id<"posts">;
  _creationTime: number;
  caption?: string;
  userId: Id<"users">;
  imageUrl: string;
  storageId: Id<"_storage">;
  likes: number;
  comments: number;
};

export default function userProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const profile = useQuery(api.users.getUserProfile, { Id: id as Id<"users"> });
  const posts = useQuery(api.posts.getPostsByUser, {
    userId: id as Id<"users">,
  });
  const isFollowing = useQuery(api.users.isFollowing, {
    followerId: id as Id<"users">,
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/tabs");
    }
  };

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  if (profile === undefined || posts === undefined || isFollowing === undefined)
    return <Loader />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.avatarAndStats}>
          <Image
            source={profile.image}
            contentFit="cover"
            cachePolicy={"memory-disk"}
            style={styles.avatar}
          />

          {/* STATS */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.nameAndBio}>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.name}>username :@{profile.username}</Text>
        <Text style={styles.bio}> Bio :{profile.bio}</Text>
      </View>
      <View style={styles.followButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
        >
          <Text
            style={[
              styles.followButtonText,
              isFollowing && styles.followingButtonText,
            ]}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>Media Contents:</Text>
      </View>
      <View style={styles.postsGrid}>
        {posts.length === 0 ? (
          <NoPostsFound />
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.gridItem}
                onPress={() => setSelectedPost(item)}
              >
                <Image
                  source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit="cover"
                  transition={200}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
          />
        )}
      </View>
      <Modal
        visible={!!selectedPost}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedPost(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedPost && (
            <View style={styles.postDetailContainer}>
              <View style={styles.postDetailHeader}>
                <TouchableOpacity onPress={() => setSelectedPost(null)}>
                  <Ionicons name="close" size={24} color={colors.white} />
                </TouchableOpacity>
              </View>

              <Image
                source={selectedPost.imageUrl}
                cachePolicy={"memory-disk"}
                style={styles.postDetailImage}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
