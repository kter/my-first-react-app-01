import { Fragment, type ReactNode } from 'react';
import type { Book } from './Book';

type ListTemplateProps = {
  src: Array<Book>,
  children: (b: Book) => ReactNode // Bookを受け取りReactNodeを返す
};

export default function ListTemplate({ src, children }: ListTemplateProps) {
  return (
    <dl>
      {
        src.map(elem => (
          <Fragment key={elem.isbn}>
            {children(elem)}
          </Fragment>
        ))
      }
    </dl>
  );
}

