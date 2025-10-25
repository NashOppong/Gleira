import { colors } from "@/constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  logo: {
    marginRight: 250,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    color: colors.primary,
    fontWeight: "800",
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  storyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
    width: 68,
    marginBottom: 8,
    paddingHorizontal: 7,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 4,
  },
  noStory: {
    borderColor: colors.grey,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.background,
  },
  storyUsername: {
    fontSize: 11,
    color: colors.white,
    textAlign: "center",
  },
  post: {
    //flex: 1,
    //borderTopWidth: 1,
    borderTopColor: colors.grey,
    marginVertical: 10,
    //borderWidth: 1,
    borderColor: colors.white,
    width: 400,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  postHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  postImageContainer: {
    height: 200,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 4,
    borderRadius: 20,
  },
  postImage: {
    width: 350,
    height: 200,
    borderRadius: 20,
  },
  postCaption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 15,
  },
  postCaptionText: {
    fontSize: 14,
    color: colors.white,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  postInfo: {
    paddingHorizontal: 12,
  },
  likesText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 6,
  },
  captionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  captionUsername: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginRight: 6,
  },
  captionText: {
    fontSize: 14,
    color: colors.white,
    flex: 1,
  },
  commentsText: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.grey,
    marginBottom: 8,
  },
  modalContainer: {
    backgroundColor: colors.background,
    marginBottom: Platform.OS === "ios" ? 44 : 0,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 44 : 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.surface,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.surface,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    color: colors.white,
    fontWeight: "500",
    marginBottom: 4,
  },
  commentText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  commentTime: {
    color: colors.grey,
    fontSize: 12,
    marginTop: 4,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    backgroundColor: colors.surface,
    borderRadius: 20,
    fontSize: 14,
  },
  postButton: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
