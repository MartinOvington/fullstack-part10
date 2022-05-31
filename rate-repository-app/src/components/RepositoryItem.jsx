import { View, Text } from 'react-native';

const RepositoryItem = ({ repoItem }) => {
  return (
    <View>
      <Text>Full name: {repoItem.fullName}</Text>
      <Text>Description: {repoItem.description}</Text>
      <Text>Language: {repoItem.language}</Text>
      <Text>Stars: {repoItem.stargazersCount}</Text>
      <Text>Fork: {repoItem.forksCount}</Text>
      <Text>Reviews: {repoItem.reviewCount}</Text>
      <Text>Rating: {repoItem.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
