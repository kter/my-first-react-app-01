export default function ForItem({ book }) {
  return (
    <>
      <dt>
        {book.title} ({book.price}円)
      </dt>
      <dd>{book.summary}</dd>
    </>
  );
}
