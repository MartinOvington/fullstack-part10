import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

const AppBarTab = ({ tabName, navTo }) => (
  <Link style={styles.tab} to={navTo}>
    <Text color="textButton" fontSize="subheading">
      {tabName}
    </Text>
  </Link>
);

export default AppBarTab;
