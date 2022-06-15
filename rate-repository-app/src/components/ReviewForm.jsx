import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import * as yup from 'yup';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useNavigate } from 'react-router';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required is required'),
  rating: yup
    .number()
    .min(0, 'Rating must at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
});

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput name="text" placeholder="Review" multiline />
          <Pressable style={styles.pressable} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: { repositoryName, ownerName, rating: Number(rating), text },
        },
      });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
