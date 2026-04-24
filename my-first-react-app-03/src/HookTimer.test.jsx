import { act, render, screen } from '@testing-library/react';
import HookTimer from '../../my-first-react-app-01/src/HookTimer';

describe('HookTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('setInterval', () => {
    const { debug } = render(<HookTimer init={10} />);
    // Stateの反映は非同期なのでactを使って文章ツリーに反映されることを保証する
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const counter = screen.getByText(/Current/);
    debug(counter);
    expect(counter).toHaveTextContent('9');
  });
});

