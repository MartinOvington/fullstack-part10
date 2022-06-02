import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab tabName="Repositories" navTo="/" />
        <AppBarTab tabName="Sign in" navTo="/signIn" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
