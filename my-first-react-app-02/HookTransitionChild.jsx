import { memo } from 'react';
import books from './books';

const sleep = (delay) => {
  const start = Date.now();
  while (Date.now() - start < delay);
}

export function BookDetails({ isbn }) {
  const book = books.find(b => b.isbn === isbn);
  return (
    <ul>
      <li>ISBN: {book?.isbn}</li>
      <li>Title: {book?.title}</li>
      <li>Price: {book?.price}</li>
      <li>Detail: {book?.summary}</li>
      <li>Download: {book?.download) ? 'Yes' : 'No' }</li>
    </ul>
  );
}

export const CommentList = memo(function({ src, isPending }) {
  if (isPending) return <p>Now Loading...</p>;
  return (
    <ol>
      {src.map(c => <CommentItem key={c.id} src={c} />)}
    </ol>
  );
});

function CommentItem({ src }) {
  sleep(1000);
  return <li>{src.body} ({src.rank}) </li>;
}

