import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import theme from '../theme';
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  scrollview: {
    flex: 0,
    flexDirection: 'row',
  },
});

const SignInOut = ({ loading, data }) => {
  if (loading) {
    return null;
  } else if (!data || data.me == null) {
    return (
      <>
        <AppBarTab tabName="Sign in" navTo="/signIn" />
        <AppBarTab tabName="Sign up" navTo="/signUp" />
      </>
    );
  } else {
    return (
      <>
        <AppBarTab tabName="Create a review" navTo="/createreview" />
        <SignOutTab />
      </>
    );
  }
};

const AppBar = () => {
  const { data, loading } = useQuery(GET_ME);
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab tabName="Repositories" navTo="/" />
        <SignInOut loading={loading} data={data} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
