import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName="Repositories" />
    </View>
  );
};

export default AppBar;
