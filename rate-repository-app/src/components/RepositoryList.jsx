import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  footer: {
    height: 100,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const Footer = () => <View style={styles.footer} />;
const Header = ({ orderBy, setOrderBy, searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.header}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Picker
        selectedValue={orderBy}
        onValueChange={(value) => {
          setOrderBy(value);
        }}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rate repositories" value="highestRated" />
        <Picker.Item label="Lowest rate repositories" value="lowestRated" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  setOrderBy,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(repo) => repo.fullName}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem repoItem={item} />
          </Pressable>
        )}
        ListHeaderComponent={
          <Header
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
        ListFooterComponent={Footer}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories(orderBy, debouncedQuery);

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
