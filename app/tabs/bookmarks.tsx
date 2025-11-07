import { Loader } from "@/components/Loader";
import NoBookmarksFound from "@/components/NoBookmarksFound";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export type PostProps = {
  _id: Id<"posts">;
  _creationTime: number;
  caption?: string;
  userId: Id<"users">;
  imageUrl: string;
  storageId: Id<"_storage">;
  likes: number;
  comments: number;
};

export type BookmarkProps = {
  post: PostProps | null;
  _id: Id<"bookmarks">;
  _creationTime: number;
  userId: Id<"users">;
  postId: Id<"posts">;
};

const bookmarks = () => {
  const getBookmarkedPost = useQuery(api.bookmarks.getBookmarks);

  if (getBookmarkedPost === undefined) return <Loader />;
  if (getBookmarkedPost.length === 0) return <NoBookmarksFound />;

  const renderItem = ({ item }: { item: BookmarkProps }) => {
    if (!item.post) return null;

    return (
      <View style={{ borderRadius: 10 }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={item.post.imageUrl}
            style={{ height: 200, width: 180 }}
            contentFit="cover"
            cachePolicy={"memory-disk"}
            transition={700}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>bookmarks</Text>
      </View>
      <FlatList
        data={getBookmarkedPost}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          padding: 10,
          gap: 10,
          //marginBottom: 12,
          //justifyContent: "space-between",
          borderRadius: 10,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default bookmarks;
