import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputBox: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: theme.colors.textSecondary,
  },
  errorInputBox: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: theme.colors.errorMessage,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  return (
    <NativeTextInput
      style={
        error === false || error === undefined
          ? styles.inputBox
          : styles.errorInputBox
      }
      {...props}
    />
  );
};

export default TextInput;
