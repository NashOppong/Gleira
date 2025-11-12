import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/feed.styles";
import CommentsModal from "./CommentsModal";

export type PostProps = {
  _id: Id<"posts">;
  imageUrl: string;
  caption?: string;
  likes: number;
  comments: number;
  _creationTime: number;
  isLiked: boolean;
  isBookmarked: boolean;
  author: {
    _id: string;
    username: string;
    fullname: string;
    image: string;
  };
};
const PostCard = ({ item }: { item: PostProps }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);

  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);
  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);

  const { user } = useUser();
  const convexUser = useQuery(
    api.users.getUsersByClerkId,
    user
      ? {
          clerkId: user.id,
        }
      : "skip"
  );
  const handleLike = async () => {
    try {
      const newIsLiked = await toggleLike({ postId: item._id });
      setIsLiked(newIsLiked);
      setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookmark = async () => {
    try {
      const newISBookmarked = await toggleBookmark({ postId: item._id });
      setIsBookmarked(newISBookmarked);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = useMutation(api.posts.deletePost);
  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: item._id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link
          href={
            convexUser?._id === item.author._id
              ? `/user/${convexUser._id}`
              : `/user/${item.author._id}`
          }
          asChild
        >
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
        {item.author._id === convexUser?._id ? (
          <TouchableOpacity onPress={handleDeletePost}>
            <Ionicons name="trash-outline" size={18} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={18} color="white" />
          </TouchableOpacity>
        )}
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
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {item.likes > 0 ? `${item.likes} likes` : "Be The First To Like"}
        </Text>

        {item.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{item.author.username}</Text>
            <Text style={styles.captionText}>{item.caption}</Text>
          </View>
        )}

        {item.comments > 0 ? (
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text style={styles.commentsText}>
              View all {item.comments} comments
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.commentsText}>No comments yet</Text>
        )}

        <Text style={styles.timeAgo}>
          {formatDistanceToNow(item._creationTime)}
        </Text>
      </View>
      <CommentsModal
        postId={item._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

export default PostCard;
