import { Fragment } from 'react';

export default function ForList({ src }) {
  return (
    <dl>
      {
        src.map(elem => (
          <Fragment key={elem.isbn}>
            <dt>
              {elem.title} ({elem.price}円)
            </dt>
            <dd>{elem.summary}</dd>
          </Fragment>
        ))}
    </dl>
  );
}

