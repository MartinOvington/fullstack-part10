import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const ReviewItem = ({ review }) => {
  return <Text>Hello Mr. Thompson {review.text}</Text>;
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
  }, [loading]);

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) {
    return <Text>Loading</Text>;
  } else if (error) {
    console.log(error);
    return null;
  } else if (!repository) {
    console.log('no repo item');
    return null;
  }
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repoItem={repository} urlButton />
      )}
    />
  );
};

export default SingleRepository;
