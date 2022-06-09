import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: theme.tab,
});

const AppBarTab = ({ tabName, navTo }) => (
  <Link style={styles.tab} to={navTo}>
    <Text color="textButton" fontSize="subheading">
      {tabName}
    </Text>
  </Link>
);

export default AppBarTab;
