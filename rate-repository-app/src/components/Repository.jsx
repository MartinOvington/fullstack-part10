import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  topBox: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: { margin: 5, width: 50, height: 50, borderRadius: 5 },
  userInfo: {
    margin: 10,
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
  },
  languageBox: {
    backgroundColor: theme.colors.blueButton,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
    alignSelf: 'flex-start',
  },
  bottomBox: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  urlLink: {
    backgroundColor: theme.colors.blueButton,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
});

const StatItem = ({ number, text }) => {
  const numText =
    number >= 1000
      ? (Math.round(number / 100) / 10).toString().concat('k')
      : number.toString();
  return (
    <View>
      <Text fontWeight="bold">{numText}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const Repository = ({ repoItem, urlButton }) => {
  return (
    <View testID="repositoryItem">
      <View style={styles.topBox}>
        <Image
          style={styles.avatar}
          source={{
            uri: repoItem.ownerAvatarUrl,
          }}
        />
        <View style={styles.userInfo}>
          <Text fontSize="subheading" fontWeight="bold">
            {repoItem.fullName}
          </Text>
          <Text color="textSecondary" style={{ flexShrink: 1 }}>
            {repoItem.description}
          </Text>
          <View style={styles.languageBox}>
            <Text color="textButton">{repoItem.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBox}>
        <StatItem number={repoItem.stargazersCount} text="Stars" />
        <StatItem number={repoItem.forksCount} text="Forks" />
        <StatItem number={repoItem.reviewCount} text="Reviews" />
        <StatItem number={repoItem.ratingAverage} text="Rating" />
      </View>
      {urlButton ? (
        <Pressable
          style={styles.urlLink}
          onPress={() => {
            Linking.openURL(repoItem.url);
          }}
        >
          <Text color="textButton">Open in GitHub</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Repository;
