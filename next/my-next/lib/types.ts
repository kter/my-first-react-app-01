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

export type Review = Book & {
  read: Date;
  memo: string;
};

export type BookApi = {
  id: string,
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    imageLinks: {
      smallThumbnail: string | null;
    };
  },
  saleInfo: {
    listPrice: {
      amount: number;
    };
  };
};

export type BookResultProps = ReadOnly<{
  params: Promise<{
    keyword?: string[];
  }>
}>;
export type BookDetailsProps = ...;

export type BookResultProps = ...;

export type EditPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>
}>;

export type FormEditProps = Readonly<{
  src: {
    id: string;
    read: string;
    memo?: string;
  }
}>;

