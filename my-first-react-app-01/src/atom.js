import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const todosAtom = atom([
  {
    id: 1,
      title: 'title 1',
      isDone: false
  },
  {
    id: 2,
      title: 'title 2',
      isDone: true
  }
]);

// export const counterAtom = atom(0);
export const counterAtom = atomWithReset(0);

export const todoLastIdAtom = atom(get => {
  const todos = get(todosAtom);
  return todos.at(-1)?.id ?? 0;
});

export const todoAddAtom = atom(null, (get, set, title) => {
  set(todosAtom, [
    ...get(todosAtom),
    {
      id: get(todoLastIdAtom) + 1,
      title,
      isDone: false
    }
  ]);
});

export const todoDoneAtom = atom(null, (get, set, id) => {
  set(todosAtom,
    get(todosAtom).map(item => {
      if (item.id === Number(id)) {
        return {
          ...item,
          isDone: true
        };
      } else {
        return item;
      }
    })
  );
});

export const todoRemoveAtom = atom(null, (get, set, id) => {
  set(todosAtom,
    get(todosAtom).filter(item =>
      item.id !== Number(id)
    )
  );
});
