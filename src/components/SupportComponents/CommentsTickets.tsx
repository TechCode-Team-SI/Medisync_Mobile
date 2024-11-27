import styles from "@/src/components/SupportComponents/stylesChat";
import React, { MutableRefObject, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

interface TicketComment {
  id: string;
  comment: string;
  createdBy: {
    fullName: string;
  };
  createdAt: string;
}

interface CommentsTicketsProps {
  comments: TicketComment[];
}

const CommentsTickets: React.FC<CommentsTicketsProps> = ({ comments }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      ref={scrollViewRef}
    >
      <View className={styles.container2}>
        {comments.map((comment) => (
          <View key={comment.id} className={styles.commentContainer}>
            <Text className={styles.commentUser}>
              {comment.createdBy.fullName}
            </Text>
            <Text className={styles.commentDate}>
              {new Date(comment.createdAt).toLocaleString()}
            </Text>
            <Text className={styles.commentText}>{comment.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CommentsTickets;
