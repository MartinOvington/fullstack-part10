import { useQuery } from '@apollo/client';
import { StyleSheet, View, FlatList } from 'react-native';
import Review from './Review';
import { GET_ME } from '../graphql/queries';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  const reviewNodes = data.me.reviews.edges
    ? data.me.reviews.edges
        .map((edge) => edge.node)
        .sort((a, b) => b.rating - a.rating)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <Review
          review={item}
          heading={item.repository.fullName}
          refetch={refetch}
          enableButtons
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
