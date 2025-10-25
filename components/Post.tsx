import { colors } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Post = ({ post }: { post: any }) => {
  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link href={"/tabs/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{post.author.fullname}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.postImageContainer}>
        <Image
          source={post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>
      <View style={styles.postCaption}>
        <Text style={styles.postCaptionText}>{post.caption}</Text>
      </View>
      {/* POST ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={() => "handleLike"}>
            <Ionicons name={"heart-outline"} size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => "setShowComments"}>
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => "handleBookmark"}>
          <Ionicons name={"bookmark-outline"} size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
