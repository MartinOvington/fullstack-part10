import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  container: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
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
});

const formatDate = (date) => {
  const year = date.match(/\d{4}/);
  const month = date.match(/-(\d{2})-/);
  const day = date.match(/-(\d{2})T/);
  return day[1] + '.' + month[1] + '.' + year;
};
//review.createdAt.replace(/T.*$/, '')
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.reviewScore}>{review.rating}</Text>
      <View>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const params = useParams();
  const [repository, setRepository] = useState(null);
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: params.id },
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  useEffect(() => {
    if (!loading && !error) {
      setRepository(data.repository);
    }
  }, [loading, data]);

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) {
    return <Text>Loading</Text>;
  } else if (error) {
    console.log(error);
    return null;
  } else if (!repository) {
    return null;
  }
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem repoItem={repository} urlButton />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
