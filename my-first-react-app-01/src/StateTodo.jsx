import { useState } from 'react';
import './StateTodo.css'

export default function StateTodo() {
  const [maxId, setMaxId] = useState(1);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState([]);
  const [desc, setDesc] = useState(true);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setTodo([
      ...todo,
      {
        id: maxId,
        title,
        created: new Date(),
        isDone: false
      }
    ]);
    setMaxId(id => id + 1);
  };

  const handleDone = e => {
    setTodo(todo.map(item => {
      if (item.id === Number(e.target.dataset.id)) {
        return {
          ...item,
          isDone: !item.isDone
        };
      } else {
        return item;
      }
    }));
  };

  const handleRemove = e => {
    setTodo(todo.filter(item =>
      item.id !== Number(e.target.dataset.id)
    ));
  };

  const handleSort = () => {
    const sorted = [...todo];
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime();
      } else {
        return m.created.getTime() - n.created.getTime();
      }
    });
    setDesc(d => !d);
    setTodo(sorted);
  };

  return (
    <div>
      <label>
        Todo:
        <input type="text" name="title" value={title} onChange={handleChangeTitle} />
      </label>
      <button type="button" onClick={handleClick}>Add</button>
      <button type="button" onClick={handleSort}>Sort ({desc ? '↑' : '↓'}) </button>
      <hr />
      <ul>
        {todo.map(item => (
          <li key={item.id} className={item.isDone ? 'done' : ''}>
            {item.title}
            <button type="button" onClick={handleDone} data-id={item.id}>Done</button>
            <button type="button" onClick={handleRemove} data-id={item.id}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
