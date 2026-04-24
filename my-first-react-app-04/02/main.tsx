import ListTemplate from './ListTemplate';
import books from './books';
import type { Book } from './Book';

...

root.render(
  <ListTemplate src={books}>
    {(elem: Book) => (
      <>
        <dt>
          {elem.isbn}
          {elem.title}
          {elem.price}
        </dt>
        <dd>{elem.summary}</dd>
      </>
    )}
    );

