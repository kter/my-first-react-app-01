import { Fragment } from 'react';
import ForItem from './ForItem';

export default function ForSort({ src }) {
  // [...src]で複製できる.propsで受け取った値を変更すべきではないため
  const sorted = [...src].sort((m, n) => n.price - m.price);
  return (
    <dl>
      {sorted.map(elem => (
        <ForItem book={elem} />
      ))}
    </dl>
  )
}
