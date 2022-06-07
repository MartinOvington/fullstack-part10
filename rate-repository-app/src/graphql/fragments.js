import { gql } from '@apollo/client';

export const REPO_FIELDS = gql`
  fragment RepoFields on RepositoryConnection {
    edges {
      node {
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
  }
`;
