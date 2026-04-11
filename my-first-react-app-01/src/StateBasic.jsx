import { useState } from 'react';

export default function StateBasic({ init }) {
  const [count, setCount] = useState(init);
  const handleClick = () => setCount(count + 1);
  return (
    <>
      <button onClick={handleClick}>count</button>
      <p>click {count} times</p>
    </>
  );
}

