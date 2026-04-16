import { useState, useRef } from 'react';

export default function HookRef() {
  const id = useRef(null);
  const [count, setCount] = useState(0);

  const handleStart = () => {
    if (id.current === null) {
      id.current = setInterval(() => setCount(c => c + 1), 1000);
    }
  };

  const handleEnd = () => {
    clearInterval(id.current);
    id.current = null;
  };

  return (
    <>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleEnd}>End</button>
    <p>{count}</p>
    </>
  )
}
