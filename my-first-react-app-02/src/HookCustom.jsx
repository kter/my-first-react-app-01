import useCounter from './UseCounter';

export default function HookCustom() {
  const [state, handleUp, handleDown, handleReset] = useCounter(0, 1);
  return (
    <>
      <button onClick={handleUp}>Count up</button>
      <button onClick={handleDown}>Count down</button>
      <button onClick={handleReset}>Count reset</button>
      <p>{state.count} times, clicked</p>
    </>
  );
}
