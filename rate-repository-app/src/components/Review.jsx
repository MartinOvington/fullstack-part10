import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  container1: {
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  container2: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  container3: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reviewScore: {
    margin: 7,
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: theme.colors.blueButton,
    color: theme.colors.blueButton,
  },
  reviewText: {
    paddingRight: 40,
  },
  viewButton: {
    backgroundColor: theme.colors.blueButton,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 30,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.errorMessage,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 30,
    padding: 10,
  },
});

const formatDate = (date) => {
  const year = date.match(/\d{4}/);
  const month = date.match(/-(\d{2})-/);
  const day = date.match(/-(\d{2})T/);
  return day[1] + '.' + month[1] + '.' + year;
};

const Review = ({ review, heading, enableButtons, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const onNav = (repoId) => {
    navigate(`/repository/${repoId}`);
  };

  const onDelete = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({
              variables: { deleteReviewId: review.id },
            });
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.reviewScore}>{review.rating}</Text>
        <View>
          <Text fontSize="subheading" fontWeight="bold">
            {heading}
          </Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {enableButtons ? (
        <View style={styles.container3}>
          <Pressable
            style={styles.viewButton}
            onPress={() => onNav(review.repository.id)}
          >
            <Text color="textButton">View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={() => onDelete()}>
            <Text color="textButton">Delete review</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default Review;
