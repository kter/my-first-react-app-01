import { use } from 'react';

export default function UsePromise({ service }) {
  const data = use(service);
  return (
    <div>{data}</div>
  );
}

