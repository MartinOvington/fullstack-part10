import { gql } from '@apollo/client';

export const REPO_FIELDS = gql`
  fragment RepoFields on RepositoryConnection {
    edges {
      node {
        id
        fullName
        language
        description
        ownerAvatarUrl
        forksCount
        stargazersCount
        reviewCount
        ratingAverage
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
`;

export const SINGLE_REPO_FIELDS = gql`
  fragment SingleRepoFields on Repository {
    id
    fullName
    language
    description
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
