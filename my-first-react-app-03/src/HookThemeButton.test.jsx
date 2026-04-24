import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HookThemeButton from '../../my-first-react-app-01/src/HookThemeButton';
import MyThemeProvider from '../../my-first-react-app-01/src/MyThemeProvider';

test('HookThemeButton Test', async () => {
  const ev = userEvent.setup();
  render(<HookThemeButton />, { wrapper: MyThemeProvider });
  const btn = screen.getByRole('button');
  await ev.click(btn);
  await waitFor(() => expect(btn).toHaveTextContent('dark'));
});

