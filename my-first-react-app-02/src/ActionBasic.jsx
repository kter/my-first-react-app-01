import { useActionState, useState } from 'react';
import { updateForm } from './actions';

export default function ActionBasic() {
  const [books, setBooks] = useState([]);

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
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
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.price} - {book.published}
          </li>
        ))}
      </ul>
    </form>
  );
}
