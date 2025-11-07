import { colors } from "@/constants/theme";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Id } from "@/convex/_generated/dataModel";

export type NotificationProps = {
  _id: Id<"notifications">;
  _creationTime: number;

  type: "comment" | "follow" | "like";

  receiverId: Id<"users">;
  senderId: Id<"users">;

  sender: {
    id: Id<"users">;
    username: string;
    fullname: string;
    image: string;
  };

  post: {
    _id: Id<"posts">;
    _creationTime: number;
    caption?: string;
    userId: Id<"users">;
    imageUrl: string;
    storageId: Id<"_storage">;
    likes: number;
    comments: number;
  } | null;

  comment: string | undefined;

  postId?: Id<"posts">;
  commentId?: Id<"comments">;
};
export default function Notification({
  notification,
}: {
  notification: NotificationProps;
}) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        {/* Href issues */}
        <Link href={`/notifications/user/${notification.sender.id}`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={colors.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color="#8B5CF6" />
              ) : (
                <Ionicons name="chatbubble" size={14} color="#3B82F6" />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.notificationInfo}>
          {/* Href issues */}
          <Link href={`/notifications/user/${notification.sender.id}`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: ${notification.comment}`}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>

      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}
