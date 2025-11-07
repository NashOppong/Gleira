import { Loader } from "@/components/Loader";
import NoNotificationsFound from "@/components/NoNotificationsFound";
import Notification from "@/components/NotificationCard";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, Text, View } from "react-native";

const Notifications = () => {
  const notifications = useQuery(api.notification.getNotifications);
  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Notifications;
