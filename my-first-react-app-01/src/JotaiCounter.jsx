import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { counterAtom } from './atom';

export default function JotaiCounter() {
  const [counter, setCounter] = useAtom(counterAtom);
  const resetCounter = useResetAtom(counterAtom);

  const handleClick = () => {
    setCounter( c => c + 1);
  };

  return (
    <>
    <button onClick={handleClick}>Count</button>
    <button onClick={resetCounter}>Reset</button>
    <p>{counter} times, clicked</p>
    </>
  );
}
