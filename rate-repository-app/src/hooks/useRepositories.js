import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const makeVariables = (orderBy, searchKeyword) => {
  if (orderBy === 'latest') {
    return {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
      searchKeyword,
    };
  } else if (orderBy === 'highestRated') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
      searchKeyword,
    };
  } else {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
      searchKeyword,
    };
  }
};

const useRepositories = (orderBy, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: makeVariables(orderBy, searchKeyword),
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  useEffect(() => {
    if (!loading && !error) {
      setRepositories(data.repositories);
    }
  }, [loading]);

  return { repositories, loading, refetch: () => refetch() };
};

export default useRepositories;
