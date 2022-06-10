import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit with correct arguments when form is submitted with valid arguments', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );
      fireEvent.changeText(getByPlaceholderText('Username'), 'abcde');
      fireEvent.changeText(getByPlaceholderText('Password'), 'passcode');
      fireEvent.press(getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'abcde',
          password: 'passcode',
        });
      });
    });
  });
});
