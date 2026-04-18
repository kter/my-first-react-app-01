import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { todosAtom, todoLastIdAtom } from './atom';
import './StateTodo.css';

export default function JotaiTodo() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useAtom(todosAtom);
  const maxId = useAtomValue(todoLastIdAtom);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    setTodo([
      ...todo,
      {
        id: maxId + 1,
        title,
        isDone: false
      }
    ]);
  };

  const handleDone = e => {
    setTodo(todo.map(item => {
      if (item.id === Number(e.target.dataset.id)) {
        return {
          ...item,
          isDone: true
        };
      } else {
        return item;
      }
    }));
  };

  const handleRemove = e => {
    setTodo(todo.filter(item => item.id !== Number(e.target.dataset.id)
    ));
  };

  return (
    <div>
    <label>
    Todo:
    <input type="text" name="todo"
    value={title} onChange={handleChangeTitle} />
    </label>
    <button type="button"
    onClick={handleAdd}>Add</button>
    <hr />
    <ul>
    {todo.map(item => (
      <li key={item.id}
      className={item.isDone ? 'done' : ''}>
      {item.title}
      <button type="button"
      onClick={handleDone} data-id={item.id}>Done
      </button>
      <button type="button"
      onClick={handleRemove} data-id={item.id}>Delete
      </button>
      </li>
    ))}
    </ul>
    </div>
  );
}
