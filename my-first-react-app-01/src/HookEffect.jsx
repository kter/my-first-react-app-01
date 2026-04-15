import { useEffect, useLayoutEffect, useState } from 'react';

const sleep = delay => {
  const start = Date.now();
  while (true) {
    if (Date.now() - start > delay) {break;}
  }
};

export default function HookEffect({init}) {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  useEffect(() => {
    sleep(2000);
    setCount(init);
  }, []);

  return (
    <>
      <button onClick={handleClick}>count</button>
      <p>click {count} times</p>
    </>
  );
}
