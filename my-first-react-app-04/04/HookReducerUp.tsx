import { useReducer } from 'react';

type HookReducerUpProps = {
  init: number
};

type StateType = {
  count: number;
};

type ActionType = {
  type: 'update', //文字型リテラル
  step: number
} | {
  type: 'reset',
  init: number
};


export default function HookReducerUp({ init }: HookReducerUpProps) {
  const [state, dispatch] = useReducer(
    (state: StateType, action: ActionType) => {
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
  ...
);
}
