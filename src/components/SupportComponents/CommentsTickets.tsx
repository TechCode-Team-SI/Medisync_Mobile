import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from '@/src/components/SupportComponents/stylesChat';

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
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className={styles.container2}>
        {comments.map(comment => (
          <View key={comment.id} className={styles.commentContainer}>
            <Text className={styles.commentUser}>{comment.createdBy.fullName}</Text>
            <Text className={styles.commentDate}>{new Date(comment.createdAt).toLocaleString()}</Text>
            <Text className={styles.commentText}>{comment.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CommentsTickets;
