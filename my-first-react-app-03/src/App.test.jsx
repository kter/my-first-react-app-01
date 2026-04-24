import { render, screen } from '@testing-library/react';
import App from './App';

test('Vite + React Heading', () => {
  render(<App />);
  const headText = screen.getByText(/Vite \+ React/i);
  expect(headText).toBeInTheDocument();
});

