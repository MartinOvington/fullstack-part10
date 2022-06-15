import { View, Pressable, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { SIGN_UP } from '../graphql/mutations';

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
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username too short')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password too short')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirm"
            placeholder="Password confirmation"
            secureTextEntry
          />
          <Pressable style={styles.pressable} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useMutation(SIGN_UP);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignUp;
