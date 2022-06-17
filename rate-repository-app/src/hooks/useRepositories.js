import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const makeVariables = (orderBy, searchKeyword, first) => {
  if (orderBy === 'latest') {
    return {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
      searchKeyword,
      first,
    };
  } else if (orderBy === 'highestRated') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
      searchKeyword,
      first,
    };
  } else {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
      searchKeyword,
      first,
    };
  }
};

const useRepositories = (orderBy, searchKeyword, first) => {
  const variables = makeVariables(orderBy, searchKeyword, first);
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
