import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

const AppBarTab = ({ tabName }) => (
  <Pressable style={styles.pressable}>
    <Text color="textButton" fontSize="subheading">
      {tabName}
    </Text>
  </Pressable>
);

export default AppBarTab;
