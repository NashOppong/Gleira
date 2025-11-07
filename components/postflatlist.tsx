import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, View } from "react-native";
import { Loader } from "./Loader";
import NoPostsFound from "./NoPostsFound";
import PostCard from "./PostCard";

const PostFlatList = () => {
  const post = useQuery(api.posts.getFeedPost);
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
      />
    </View>
  );
};

export default PostFlatList;
