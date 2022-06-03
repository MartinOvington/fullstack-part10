import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    padding: 5,
  },
  pressable: {
    backgroundColor: theme.colors.blueButton,
    borderRadius: 5,
    margin: 5,
    padding: 15,
  },
  buttonText: {
    color: theme.colors.textButton,
    alignSelf: 'center',
  },
  inputBox: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: theme.colors.textSecondary,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputBox}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.inputBox}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.pressable} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => console.log(values);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
