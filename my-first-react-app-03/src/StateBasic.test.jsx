import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StateBasic from '../../my-first-react-app-01/src/StateBasic';

test('StateBasic Test', async () => {
  const ev = userEvent.setup();
  render(<StateBasic init={0} />);

  const btn = screen.getByRole('button', { name: 'count' });
  const cnt = screen.getByText(/click/i);

  await ev.click(btn);
  await waitFor(() => { expect(cnt).toHaveTextContent('1 times'); });
});

