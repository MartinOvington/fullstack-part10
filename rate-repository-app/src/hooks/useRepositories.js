import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const makeVariables = (orderBy) => {
  if (orderBy === 'latest') {
    return {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    };
  } else if (orderBy === 'highestRated') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    };
  } else {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    };
  }
};

const useRepositories = (orderBy) => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: makeVariables(orderBy),
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  useEffect(() => {
    if (!loading && !error) {
      setRepositories(data.repositories);
    }
    console.log(data);
  }, [loading]);

  return { repositories, loading, refetch: () => refetch() };
};

export default useRepositories;
