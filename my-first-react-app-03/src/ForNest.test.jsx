import { render, screen } from '@testing-library/react';
import books from '../../my-first-react-app-01/src/books';
import ForNest from '../../my-first-react-app-01/src/ForNest';

vi.mock('../../my-first-react-app-01/src/ForItem', () => {
  return {
    default: function ForItemMock({ book }) {
      return (
        <>
          <dt>{book.title}</dt>
          <dd>{book.summary.substring(0, 10)}...</dd>
        </>
      );
    },
  };
});

test('ForNest Test', () => {
  const { debug, baseElement } = render(<ForNest src={books} />);
  const dt = screen.getAllByRole('term');
  debug(baseElement);
  expect(dt).toHaveLength(3);
  expect(dt[0]).toHaveTextContent('book title 1');
});
