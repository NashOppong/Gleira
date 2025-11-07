import { colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Loader } from "./Loader";
import Comment from "./comments";

type Props = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};
const CommentsModal = ({ postId, visible, onClose, onCommentAdded }: Props) => {
  const [NewComments, setNewComments] = useState("");
  const addComments = useMutation(api.comment.addComments);
  const comments = useQuery(api.comment.getComments, { postId });
  const handleAddComments = async () => {
    if (!NewComments.trim()) return;
    try {
      await addComments({ postId, content: NewComments });
      setNewComments("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comments</Text>
          {/* placeholder to balance layout */}

          <View style={{ width: 24 }} />
        </View>
        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item._id}
          />
        )}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={colors.grey}
            value={NewComments}
            onChangeText={setNewComments}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddComments}
            disabled={!NewComments.trim()}
          >
            <Feather
              name="send"
              size={24}
              color={colors.primary}
              style={[
                styles.postButton,
                !NewComments.trim() && styles.postButtonDisabled,
              ]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;
