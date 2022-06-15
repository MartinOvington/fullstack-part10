import { gql } from '@apollo/client';
import { REPO_FIELDS, SINGLE_REPO_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPO_FIELDS}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      ...RepoFields
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${SINGLE_REPO_FIELDS}
  query singleRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...SingleRepoFields
    }
  }
`;
