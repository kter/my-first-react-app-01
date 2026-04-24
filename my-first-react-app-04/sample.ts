let age: number = 30;

const DEBUG: boolean = true;

function getTriangleArea(base: number, height: number): number {
  return base * height / 2;
}

class Person {
  name: string = '';
  age: number = 0;

  toString(): string {
    return `Person: ${this.name} (${this.age} `;
  }
}

let flag: boolean = false;
let pi: number = 3.14159265359;
let title: string = 'rect';
let languages: string[] = ['JavaScript', 'PHP', 'Python', 'Ruby'];
let person: [string, number, boolean] = ['string', 10, false]; // taple
// assoative array
// キー・値の方を統一したいまたは定義時にキー名を決められないときは連想配列。それ以外はオブジェクト
//   例で言うとindex
//   インデックスシグニチャという
let addresses: { [index: string]: string; } = {
  'name 1': 'address 1',
  'name 2': 'address 2',
};
// object
let member: {
  name: string,
  age: number,
  married?: boolean
} = {
  name: 'name 1',
  age: 10,
  married: false
};

// generics
let list: Array<string> = ['React', 'Vue', 'Angular'];
let s = new Set<number>([1, 2, 3]);
let m = new Map<string, number>([
  ['React', 50],
  ['Vue', 30],
  ['Angular', 10]
]);

// type alias
type BookType = {
  title: string,
  price: number,
  download: boolean
};

let b: BookType = {
  title: 'React',
  price: 500,
  download: true
};

interface BookTypeA {
  title: string;
  price: number;
  download: boolean;
};

// type assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <App />
  </StrictMode>,
)
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
  <App />
  </StrictMode>,
)
