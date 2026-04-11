import { Fragment } from 'react';
// named exportの場合はimport { ForItem } from './ForItem';
// default exportの場合はimport ForItem from './ForItem';
import ForItem from './ForItem';

export default function ForFilter({ src }) {
  const lowPrice = src.filter(book => book.price < 3500);
  return (
    <dl>
      {lowPrice.map(elem => (
        <ForItem book={elem} />
      ))}
    </dl>
  )
}

