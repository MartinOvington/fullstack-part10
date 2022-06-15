import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  footer: {
    height: 100,
    backgroundColor: theme.colors.background,
  },
  selector: {
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const Footer = () => <View style={styles.footer} />;
const OrderSelector = ({ orderBy, setOrderBy }) => {
  return (
    <View style={styles.selector}>
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
          <OrderSelector orderBy={orderBy} setOrderBy={setOrderBy} />
        }
        ListFooterComponent={Footer}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('latest');
  const { repositories } = useRepositories(orderBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
    />
  );
};

export default RepositoryList;
