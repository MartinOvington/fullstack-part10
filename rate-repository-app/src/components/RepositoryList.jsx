import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  footer: {
    height: 100,
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const Footer = () => <View style={styles.footer} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  // Get the nodes from the edges array

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(repo) => repo.fullName}
        renderItem={({ item }) => <RepositoryItem repoItem={item} />}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

export default RepositoryList;
