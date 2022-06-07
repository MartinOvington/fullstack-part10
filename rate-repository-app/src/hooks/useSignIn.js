import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    return authenticate({
      variables: { credentials: { username, password } },
    });
  };

  return [signIn, result];
};

export default useSignIn;
