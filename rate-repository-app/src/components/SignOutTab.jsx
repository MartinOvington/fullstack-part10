import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  tab: theme.tab,
});

const SignOutTab = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <Pressable style={styles.tab} onPress={signOut}>
      <Text color="textButton" fontSize="subheading">
        Sign Out
      </Text>
    </Pressable>
  );
};

export default SignOutTab;
