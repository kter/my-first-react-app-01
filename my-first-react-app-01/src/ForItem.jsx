import Download from './Download';

export default function ForItem({ book }) {
  let dd;
  // downloadプロパティに応じてタグを分岐
  if (book.download) {
    dd = <dd>{book.summary}<Download /></dd>;
  } else {
    dd = <dd>{book.summary}</dd>;
  }

  return (
    <>
      <dt>
        {book.title} ({book.price}円)
      </dt>
      // ここで埋め込む
      {dd}
      // もしくは即時関数でJSX式に直接埋め込んでも良い
      {(() => {
        if (book.download) {
          return <dd>{book.summary}<Download /></dd>
        } else {
          return <dd>{book.summary}</dd>
        }
      })()}
    </>
  );
}
