import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Loader } from "./Loader";
import NoPostsFound from "./NoPostsFound";
import PostCard from "./PostCard";

const PostFlatList = () => {
  const post = useQuery(api.posts.getFeedPost);
  const [refreshing, setRefreshing] = useState(false);

  //implement tanstack query
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  if (post === undefined) return <Loader />;
  if (post.length === 0) return <NoPostsFound />;
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

  return (
    <View style={{ marginBottom: 250 }}>
      <FlatList
        data={post}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 60 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default PostFlatList;
