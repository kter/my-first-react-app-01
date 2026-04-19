import { useState } from 'react';
import { updateForm } from './actions';

export default function BookForm() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const submitAction = async e => {
    e.preventDefault();
    setIsPending(true);
    const { result, error } = await updateForm({
      id: crypto.randomUUID(),
      title: e.target.title.value,
      price: e.target.price.value,
      published: e.target.published.value
    });

    setIsPending(false);
    setError(errors);
    if (errors) { return; }
    setBooks(prevBooks => [...prevBooks, result]);

    return (
      <form noValidate onSubmit={submitAction}>
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
          {books.map(book => (
            <li key={book.id}>
              {book.title} - {book.price} - {book.published}
            </li>
          ))}
        </ul>
      </form >
    );
  }
}
