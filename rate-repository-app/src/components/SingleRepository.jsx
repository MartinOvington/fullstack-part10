import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import Repository from './Repository';
import Review from './Review';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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
      renderItem={({ item }) => (
        <Review review={item} heading={item.user.username} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <Repository repoItem={data.repository} urlButton />
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
