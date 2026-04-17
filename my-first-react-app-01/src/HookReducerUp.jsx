import { useReducer } from 'react';

export default function HookReducerUp({ init }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'update':
          return { count: state.count + action.step };
        case 'reset':
          return { count: action.init };
        default:
          return state;
      }
    },
    {
      count: init
    }
  );

  const handleUp = () => dispatch({ type: 'update', step: 1 });
  const handleDown = () => dispatch({ type: 'update', step: -1 });
  const handleReset = () => dispatch({ type: 'reset', step: 0 });

  return (
    <>
    <button onClick={handleUp}>Count Up</button>
    <button onClick={handleDown}>Count Down</button>
    <button onClick={handleReset}>Reset</button>

    <p>{state.count} times, clicked</p>
    </>
  );
}

