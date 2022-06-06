import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

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
  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    const response = await fetch('http://192.168.0.23:5000/api/repositories');
    const json = await response.json();

    console.log(json);

    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => <RepositoryItem repoItem={item} />}
        ListFooterComponent={Footer}
      />
      <Text>This is the end of the page</Text>
    </View>
  );
};

export default RepositoryList;
