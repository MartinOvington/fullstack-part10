import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackGround,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/createreview" element={<ReviewForm />} exact />{' '}
        <Route path="/signIn" element={<SignIn />} exact />{' '}
        <Route path="/" element={<RepositoryList />} exact />{' '}
        <Route path="*" element={<Navigate to="/" replace />} />{' '}
      </Routes>
    </View>
  );
};

export default Main;
