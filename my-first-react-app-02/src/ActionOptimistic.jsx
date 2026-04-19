import { useActionState, useOptimistic, useState } from 'react';
import { updateForm } from './actions';

export default function ActionOptimistic() {
  const [books, setBooks] = useState([]);
  const [optimisticBooks, setOptimisticBooks] = useOptimistic(
    books,
    (prevBooks, formData) => {
      return [...prevBooks, {
        id: crypto.randomUUID(),
        title: formData.get('title'),
        price: formData.get('price'),
        published: formData.get('published'),
        updating: true
      }];
    }
  );

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      setOptimisticBooks(formData);
      const { result, errors } = await updateForm({
        id: crypto.randomUUID(),
        title: formData.get('title'),
        price: formData.get('price'),
        published: formData.get('published')
      });
      if (!errors) {
        setBooks(prevBooks => [...prevBooks, result]);
      }
      return errors;
    },
    null
  );

  return (
    <form noValidate action={submitAction}>
      <ul>
        {error?.map(msg => <li key={msg}>{msg}</li>)}
      </ul>
      <div>
        <label htmlFor="title">Name:</label><br />
        <input id="title" name="title" type="text" size="20" />
      </div>
      <div>
        <label htmlFor="price">Price: </label><br />
        <input id="price" name="price" type="number" />
      </div>
      <div>
        <label htmlFor="published">Published: </label><br />
        <input id="published" name="published" type="date" />
      </div>
      <div>
        <button type="submit" disabled={isPending}>Submit</button>
      </div>
      <ul>
        {optimisticBooks.map((book, index) => (
          <li key={index}>
            {book.title} - {book.price} - {book.published}
            {book.updating && <small> (Updating...)</small>}
          </li>
        ))}
      </ul>
    </form >
  );
}

