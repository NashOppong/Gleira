import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Story = () => {
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.storiesContainer}>
        <TouchableOpacity style={styles.storyWrapper}>
          <View style={[styles.storyRing, !item.hasStory && styles.noStory]}>
            <Image source={item.avatar} style={styles.storyAvatar} />
          </View>
          <Text style={styles.storyUsername}>{item.username}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={STORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Story;
