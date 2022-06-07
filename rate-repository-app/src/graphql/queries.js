import { gql } from '@apollo/client';
import { REPO_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPO_FIELDS}
  query {
    repositories {
      ...RepoFields
    }
  }
`;
