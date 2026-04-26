import Image from 'next/image';
import type { BookDetailsProps } from '@/lib/types';

export default function BookDetails({ index, book }: BookDetailsProps) {
  return (
    <div className="flex w-full mb-4">
      <div>
        <Image src={book.image} alt={book.title} width={128} height={163} />
      </div>
      <div>
        <ul className="list-none text-black ml-4">
          <li>{index && index + '.'}</li>
          <li>{book.title} ({book.price})</li>
          <li>{book.author}</li>
          <li>{book.publisher}</li>
          <li>{book.published}</li>
        </ul>
      </div>
    </div>
  );
}

