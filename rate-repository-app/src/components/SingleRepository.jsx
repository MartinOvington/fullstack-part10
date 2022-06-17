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
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: params.id, first: 8 },
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  const onEndReach = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: params.id,
        first: 8,
      },
    });
  };

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  const reviewNodes = data.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem repoItem={data.repository} urlButton />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
