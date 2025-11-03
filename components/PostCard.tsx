import { colors } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/feed.styles";

type PostProps = {
  _id: Id<"posts">;
  imageUrl: string;
  caption?: string;
  likes: number;
  comments: number;
  _creationTime: number;
  isLiked: boolean;
  isBookmarked: boolean;
  author: {
    username: string;
    fullname: string;
    image: string;
  };
};
const PostCard = ({ item }: { item: PostProps }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);

  const handleLike = async () => {};
  const handleBookmark = async () => {};
  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link href={"/tabs/notifications"}>
          <TouchableOpacity activeOpacity={0.8} style={styles.postHeaderLeft}>
            <Image
              source={item.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{item.author.fullname}</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <View style={styles.postImageContainer}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={item.imageUrl}
            style={styles.postImage}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
        </TouchableOpacity>
      </View>

      {/* ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to like</Text>

        {item.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{item.author.username}</Text>
            <Text style={styles.captionText}>{item.caption}</Text>
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

export default PostCard;
