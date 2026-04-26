export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  publisher: string;
  published: string;
  image: string;
};

export type BookDetailsProps = Readonly<{
  index?: number;
  book: Book;
}>;

