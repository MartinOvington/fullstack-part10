import { gql } from '@apollo/client';
import { REPO_FIELDS, SINGLE_REPO_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPO_FIELDS}
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      ...RepoFields
    }
  }
`;

export const GET_ME = gql`
  query getMe($includeReviews: Boolean = false) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            createdAt
            rating
            repository {
              id
              fullName
              ownerName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${SINGLE_REPO_FIELDS}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...SingleRepoFields
    }
  }
`;
