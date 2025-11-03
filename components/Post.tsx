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
          <TouchableOpacity
            style={styles.postHeaderLeft}
            onPress={() => {
              console.log("clicked");
            }}
          >
            <TouchableOpacity onPress={() => console.log("image pressed")}>
              <Image
                source={post.author.image}
                style={styles.postAvatar}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </TouchableOpacity>

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

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to like</Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}
        <TouchableOpacity>
          <Text style={styles.commentsText}>View all comments</Text>
        </TouchableOpacity>

        <Text style={styles.timeAgo}>2hrs ago</Text>
      </View>
    </View>
  );
};

export default Post;
