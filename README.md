# React 入門ガイド

React の基本から実践的なパターンまでを体系的にまとめたドキュメントです。

---

## React とは

React は Meta（旧 Facebook）が開発した JavaScript の UI ライブラリです。「コンポーネント」という部品単位で UI を組み立て、データが変わったときに必要な部分だけを自動で再描画します。

### React の 3 つの核心概念

| 概念 | 説明 |
|------|------|
| **コンポーネント** | UI の部品。関数として書き、JSX で見た目を定義する |
| **Props** | 親から子へデータを渡す仕組み。読み取り専用 |
| **State** | コンポーネント内部で管理する状態。変化すると UI が再描画される |

---

## コンポーネントと Props

React ではすべての画面要素を「コンポーネント」という関数で表現します。HTML に似た記法（JSX）で見た目を返す関数です。

```jsx
// Props を分割代入で受け取る（推奨パターン）
export default function MyHello({ myName }) {
  return <div>Hello, {myName}!</div>;
}

// 使う側
<MyHello myName="Taro" />
```

> **ポイント**: `props.myName` と書くより `{ myName }` と分割代入する方がコードが簡潔になります。`{}` の中には任意の JavaScript の式を書けます。

### children ― 子要素を受け取る

`children` という特別な Props を使うと、コンポーネントタグの内側に書いた要素を受け取れます。

```jsx
export default function Panel({ children }) {
  return <div className="panel">{children}</div>;
}

// 使う側：タグの中身が children として渡される
<Panel>
  <h2>タイトル</h2>
  <p>本文テキスト</p>
</Panel>
```

### children の key による絞り込み

複数の子要素に `key` を付けることで、特定の要素だけを取り出して配置できます。HTML の「名前付きスロット」に相当するパターンです。

```jsx
export default function TitledPanel({ children }) {
  // key が 'title' の子要素と 'body' の子要素をそれぞれ取り出す
  const title = children.find(elem => elem.key === 'title');
  const body  = children.find(elem => elem.key === 'body');

  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <hr />
      <div className="panel-body">{body}</div>
    </div>
  );
}

// 使う側：key で役割を指定して渡す
<TitledPanel>
  <h2 key="title">パネルのタイトル</h2>
  <p  key="body">パネルの本文テキスト</p>
</TitledPanel>
```

> **ポイント**: `children.find()` を使うには複数の子要素が配列として渡されている必要があります。子要素が 1 つだけのときはオブジェクトになるため注意が必要です。現代的な実装では Props として別々に渡す方法（`<Panel title={<h2>...</h2>} body={<p>...</p>}>`）も広く使われます。

---

## イベント処理

ボタンのクリックやキー入力などのユーザー操作を処理するには、イベントハンドラを JSX に渡します。

```jsx
export default function EventBasic() {
  const handleClick = () => {
    console.log(new Date().toLocaleString());
  };

  return <button onClick={handleClick}>現在時刻を表示</button>;
}
```

> **ポイント**: `onClick={handleClick}` と書くとき、`handleClick()` のように `()` をつけると**即座に実行**されてしまいます。イベントハンドラは**関数の参照**を渡すのが鉄則です。

### 主なイベントの種類

| イベント | 属性 | 用途 |
|--------|------|------|
| クリック | `onClick` | ボタン押下 |
| 入力変化 | `onChange` | テキスト入力・セレクト変更 |
| マウス | `onMouseEnter` / `onMouseLeave` | ホバー |
| キーボード | `onKeyDown` / `onKeyUp` | キー入力 |

### イベントハンドラへの引数の渡し方

イベントオブジェクト（`e`）に加えて独自の引数を渡したいときは、アロー関数でラップします。

```jsx
export default function EventArgs() {
  const handleClick = (e, type) => {
    const d = new Date();
    console.log(`${e.target.id}: ${type === 'date' ? d.toLocaleDateString() : d.toLocaleTimeString()}`);
  };

  return (
    <div>
      {/* アロー関数でラップして、追加の引数を渡す */}
      <button id="date" onClick={e => handleClick(e, 'date')}>日付</button>
      <button id="time" onClick={e => handleClick(e, 'time')}>時刻</button>
    </div>
  );
}
```

> **ポイント**: `onClick={handleClick('date')}` と書くと即座に実行されてしまいます。追加引数を渡すときは `onClick={e => handleClick(e, 'date')}` のようにアロー関数でラップします。`e`（イベントオブジェクト）を最初の引数として忘れずに渡しましょう。

---

## State（状態管理）

State はコンポーネントが持つ「変化するデータ」です。`useState` フックで宣言します。

```jsx
import { useState } from 'react';

export default function Counter({ init }) {
  const [count, setCount] = useState(init); // 初期値は init
  return (
    <>
      <button onClick={() => setCount(count + 1)}>count</button>
      <p>{count} 回クリック</p>
    </>
  );
}
```

> **ポイント**: `useState` が返す配列の 1 つ目が現在の値、2 つ目が更新関数です。更新関数を呼ぶと React が自動で UI を再描画します。`let count = 0; count++` のような通常の変数では UI は更新されません。

### State のリフトアップ

複数の子コンポーネントがデータを共有するときは、**共通の親に State を持たせ**、更新関数を Props として渡します。

```jsx
// 親コンポーネント
export default function StateParent() {
  const [count, setCount] = useState(0);
  const update = step => setCount(c => c + step); // 関数形式で前の値を安全に参照

  return (
    <>
      <p>合計: {count}</p>
      <Counter step={1}  onUpdate={update} />
      <Counter step={5}  onUpdate={update} />
      <Counter step={-1} onUpdate={update} />
    </>
  );
}

// 子コンポーネント：受け取った onUpdate を呼ぶだけ
export default function Counter({ step, onUpdate }) {
  return <button onClick={() => onUpdate(step)}>{step}</button>;
}
```

> **ポイント**: `setCount(c => c + step)` という**関数形式の更新**は、前の値を確実に参照したいときに使います。非同期処理が絡む場面で特に重要です。

---

## リスト処理

配列データを UI に変換するには `.map()` を使います。

```jsx
import { Fragment } from 'react';

export default function BookList({ books }) {
  return (
    <dl>
      {books.map(book => (
        <Fragment key={book.isbn}>
          <dt>{book.title}（{book.price}円）</dt>
          <dd>{book.summary}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

> **ポイント**: `key` は React がどの要素が変化したかを追跡するために必要です。配列のインデックス（`key={i}`）ではなく、データ固有の ID を使うことが推奨されます。

### リストの操作パターン

```jsx
// フィルタリング：価格が 3500 円未満だけ表示
const lowPrice = books.filter(book => book.price < 3500);

// ソート：タイトル順に並び替え
const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title));
```

> **ポイント**: `sort()` は元の配列を**破壊的に変更**します。State の配列をソートするときは `[...books].sort(...)` でコピーしてから行います。

---

## 条件付きレンダリング

State や Props の値に応じて、表示するコンポーネントや要素を切り替えます。

### if 文による切り替え

最もシンプルな方法は、JSX を返す前に `if` で分岐することです。

```jsx
export default function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>ようこそ！</p>;
  }
  return <p>ログインしてください</p>;
}
```

### 三項演算子（`? :`）による切り替え

JSX の中で条件分岐したいときは三項演算子を使います。

```jsx
export default function Badge({ status }) {
  return (
    <span className={status === 'active' ? 'badge-green' : 'badge-gray'}>
      {status === 'active' ? '有効' : '無効'}
    </span>
  );
}
```

### `&&` 演算子による条件付き表示

条件が `true` のときだけ表示し、`false` のときは何も表示しないパターンです。

```jsx
export default function Notification({ hasMessage, message }) {
  return (
    <div>
      <h1>ダッシュボード</h1>
      {hasMessage && <p className="notification">{message}</p>}
    </div>
  );
}
```

> **注意**: `{count && <p>{count}</p>}` のように数値を条件に使うと、`count` が `0` のとき `0` がそのまま表示されます。数値の場合は `{count > 0 && <p>{count}</p>}` や三項演算子を使いましょう。

### コンポーネントの動的切り替え

JSX では、変数に入ったコンポーネント（大文字始まり）もそのままレンダリングできます。コンポーネントを配列に入れてランダムや条件で選ぶパターンに使えます。

```jsx
import { BannerMember, BannerNew, BannerEnv } from './Banners';

export default function SelectComp() {
  const components = [BannerMember, BannerNew, BannerEnv];
  // コンポーネントを変数に代入（大文字始まりの変数名が必須）
  const SelectedComponent = components[Math.floor(Math.random() * components.length)];

  return (
    <div className="banner">
      <SelectedComponent />
    </div>
  );
}
```

> **ポイント**: JSX でコンポーネントを動的に使うには、**大文字始まりの変数に代入する**必要があります。`const selected = components[i]; return <selected />` では動作しません（小文字始まりは HTML タグとして解釈される）。

---

## render props パターン

「render props」とは、**描画内容を関数として Props で受け取る**コンポーネント設計パターンです。レイアウト（枠組み）とデータ表示（中身）を分離できるため、同じリスト構造を使いながら表示内容だけ変えたいときに役立ちます。

```jsx
// レイアウト担当コンポーネント：表示方法を render 関数として受け取る
export default function ListTemplate({ src, render }) {
  return (
    <dl>
      {src.map(elem => (
        <Fragment key={elem.isbn}>
          {render(elem)}  {/* 各要素をどう表示するかは呼び出し元が決める */}
        </Fragment>
      ))}
    </dl>
  );
}

// 使う側：同じ ListTemplate を使いながら、表示内容だけ変える
<ListTemplate
  src={books}
  render={book => (
    <>
      <dt>{book.title}</dt>
      <dd>{book.price}円</dd>
    </>
  )}
/>

<ListTemplate
  src={books}
  render={book => (
    <>
      <dt>{book.title}</dt>
      <dd>著者: {book.author}</dd>
    </>
  )}
/>
```

> **ポイント**: `children` として JSX を渡すのに対し、render props は**関数**を渡すことで、コンポーネント側のデータ（`book`）を呼び出し元が受け取れます。「枠組みは共通、中身は状況に応じて変える」という再利用パターンです。

---

## フォーム処理

React のフォームでは、入力値を必ず State で管理するのが基本です。このパターンを「**制御されたコンポーネント（Controlled Components）**」と呼びます。

```jsx
export default function ProfileForm() {
  const [form, setForm] = useState({ name: 'Yamada', age: 18 });

  const handleChange = e => {
    setForm({
      ...form,                         // 既存の値を保持
      [e.target.name]: e.target.value  // 変更されたフィールドだけ上書き
    });
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="age"  value={form.age}  onChange={handleChange} type="number" />
      <p>Hello, {form.name}（{form.age}）</p>
    </form>
  );
}
```

> **ポイント**: `[e.target.name]` は計算プロパティ名（Computed Property Names）という構文です。`name` 属性の値をキーとして使えるため、フィールドが増えてもハンドラを 1 つにまとめられます。

### 各入力要素のまとめ

| 要素 | ポイント |
|------|---------|
| `<input type="text">` | `value` + `onChange` で制御 |
| `<textarea>` | JSX では自己閉じタグ不可。`value` で制御 |
| `<select>` | `value` を `<select>` に渡して選択状態を制御 |
| `<input type="radio">` | `checked={value === selected}` で選択状態を判定 |
| `<input type="checkbox">` | `checked` + `onChange` で制御。複数選択は配列で管理 |
| `<input type="file">` | 非制御のみ。`onChange` で `e.target.files` を取得 |

---

## React Hook Form（フォームライブラリ）

制御されたコンポーネントでフォームを組むと、入力のたびに State 更新が走り、再レンダリングが多くなります。React Hook Form は**非制御コンポーネント**をベースに構築されており、バリデーション付きのフォームを少ないコードで高速に実装できます。

```jsx
import { useForm } from 'react-hook-form';

export default function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting }
  } = useForm({
    defaultValues: { title: '', price: '' },
    mode: 'onChange'  // 入力のたびにバリデーションを実行
  });

  const onSubmit = data => console.log(data);
  const onError  = err  => console.log(err);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <input
        {...register('title', {
          required: 'タイトルは必須です',
          maxLength: { value: 20, message: '20文字以内で入力してください' }
        })}
      />
      <div>{errors.title?.message}</div>

      <input
        type="email"
        {...register('email', {
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'メールアドレスの形式が正しくありません'
          }
        })}
      />
      <div>{errors.email?.message}</div>

      {/* isDirty: 値が変更された / isValid: バリデーションが通った */}
      <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
        {isSubmitting ? '送信中...' : '送信'}
      </button>
    </form>
  );
}
```

> **ポイント**: `{...register('fieldName', rules)}` をフォーム要素に展開するだけで登録できます。`errors.fieldName?.message` でエラーメッセージを表示します。`validate` に関数を渡すことでカスタムバリデーションも実装できます。

### 制御されたコンポーネント vs React Hook Form

| | 制御されたコンポーネント | React Hook Form |
|---|---|---|
| 管理方法 | State（`useState`） | DOM 参照（非制御） |
| 再レンダリング | 入力のたびに発生 | 最小限（バリデーション時のみ） |
| コード量 | 多い | 少ない |
| 向いている場面 | リアルタイム連動 UI | 通常の入力フォーム |

---

## State の実践：Todo アプリ

これまでの知識を総合した実装例です。

```
State 設計：
  maxId   ... 次の ID を管理（削除後も重複しないように連番を維持）
  title   ... 入力中のタイトル
  todo    ... [{ id, title, created, isDone }, ...]
  desc    ... ソート方向のフラグ
```

配列 State を操作する 3 つの基本パターン：

```jsx
// 追加
setTodo([...todo, { id: maxId, title, created: new Date(), isDone: false }]);

// 更新（完了トグル）
setTodo(todo.map(item =>
  item.id === targetId ? { ...item, isDone: !item.isDone } : item
));

// 削除
setTodo(todo.filter(item => item.id !== targetId));
```

> **ポイント**: `todo.push(newItem)` のような**破壊的な操作**をしても React は変化を検知できません。必ず**新しい配列を返す**操作（`map`・`filter`・スプレッド構文）を使います。

---

## Code Splitting と Suspense

アプリが大きくなると、最初に全部読み込むのは遅くなります。`React.lazy()` と `<Suspense>` を組み合わせると、コンポーネントを必要になったタイミングで読み込めます。

```jsx
import { Suspense, lazy } from 'react';

// 動的インポートで遅延読み込み
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function App() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <HeavyComponent />  {/* 読み込み完了まで fallback が表示される */}
    </Suspense>
  );
}
```

> **ポイント**: `<Suspense>` の `fallback` にはローディングスピナーやスケルトン UI を渡します。複数の `lazy` コンポーネントを 1 つの `<Suspense>` でまとめて管理することもできます。

---

## use()（Promise と Context を直接読み取る）

React 19 で追加されたフックです。他のフックと異なり、`if` 文の中や `for` ループの中でも呼び出せます。

### Promise を読み取る

`use(promise)` と書くと、Promise が解決するまで `<Suspense>` が待機します。`useSWR` や `useEffect + fetch` よりもシンプルに非同期データを扱えます。

```jsx
import { use } from 'react';
import { Suspense } from 'react';

// データを取得する Promise を作成
const fetchMessage = () =>
  fetch('/api/message').then(res => res.json()).then(data => data.text);

// use() で Promise を読み取るコンポーネント
function Message({ messagePromise }) {
  const text = use(messagePromise); // 解決するまで Suspense が待機
  return <p>{text}</p>;
}

// 呼び出し側：Suspense でラップする
export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Message messagePromise={fetchMessage()} />
    </Suspense>
  );
}
```

> **ポイント**: `use()` は Promise が pending の間 Suspense に処理を委譲し、解決したら値を返します。`useEffect` のように副作用の管理を自分で書く必要がなく、ローディング処理を `<Suspense>` に任せられます。

### Context を読み取る

`useContext` の代わりに `use` で Context を読み取ることもできます。`use` は条件分岐の中で呼べるため、条件によって参照する Context を切り替えるような場面で活用できます。

```jsx
import { use, createContext } from 'react';

const ThemeContext = createContext('light');

function Button({ isSpecial }) {
  // useContext と違い、条件分岐の中で呼び出せる
  if (isSpecial) {
    const theme = use(ThemeContext);
    return <button className={theme}>特別なボタン</button>;
  }
  return <button>通常のボタン</button>;
}
```

---

## Error Boundary

通常、子コンポーネントでエラーが発生するとアプリ全体がクラッシュします。Error Boundary を設置すると、その範囲内のエラーをキャッチしてフォールバック UI を表示できます。

```jsx
import { ErrorBoundary } from 'react-error-boundary';

export default function App() {
  return (
    <ErrorBoundary fallback={<p>エラーが発生しました</p>}>
      <SomeComponent />  {/* ここがエラーを投げても fallback が表示される */}
    </ErrorBoundary>
  );
}
```

`onReset` を渡すとリトライボタンを設けることもできます。

```jsx
<ErrorBoundary
  fallback={({ resetErrorBoundary }) => (
    <div>
      <p>エラーが発生しました</p>
      <button onClick={resetErrorBoundary}>再試行</button>
    </div>
  )}
>
  <SomeComponent />
</ErrorBoundary>
```

> **注意**: Error Boundary はイベントハンドラ内のエラーは捕捉しません。イベント内のエラーは通常の `try/catch` で処理します。

---

## Portal

モーダルダイアログやツールチップなど、z-index の問題を避けたいときに使います。`createPortal` を使うと、React のコンポーネントツリーとは別の DOM 要素にレンダリングできます。

```jsx
import { createPortal } from 'react-dom';

export default function Modal({ show, onClose }) {
  if (!show) return null;

  return createPortal(
    <div className="dialog">
      <p>ダイアログの内容</p>
      <button onClick={onClose}>閉じる</button>
    </div>,
    document.getElementById('dialog')  // レンダリング先の DOM 要素
  );
}
```

> **ポイント**: Portal を使っても、イベントのバブリングは React のコンポーネントツリーに沿って動作します。`document.getElementById('dialog')` が `<body>` 直下にあれば、親コンポーネントの CSS による `overflow: hidden` などの影響を受けずに表示できます。

---

## スタイリング手法

React では複数のスタイリング手法を選べます。

### CSS Modules

クラス名をコンポーネント単位でスコープし、名前衝突を防ぎます。

```jsx
import styles from './Panel.module.css';

export default function Panel() {
  return (
    <div className={styles.panel}>
      {/* styles.panel はビルド時に "panel_abc123" のようにハッシュ化される */}
      React is a JavaScript Library
    </div>
  );
}
```

### CSS-in-JS（Emotion）

JavaScript の変数や条件分岐をそのまま CSS に使えます。

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function StyledBox({ isActive }) {
  const boxStyle = css`
    background-color: ${isActive ? 'royalblue' : 'gray'};
    color: white;
    border-radius: 5px;
  `;
  return <div css={boxStyle}>スタイル付きボックス</div>;
}
```

### スタイリング手法の比較

| 手法 | メリット | デメリット |
|------|---------|-----------|
| インラインスタイル | シンプル | 擬似クラス（`:hover` など）が使えない |
| CSS Modules | スコープが閉じる・通常の CSS が書ける | 動的スタイルに一工夫必要 |
| Emotion（CSS-in-JS） | JS の変数・条件をそのまま使える | バンドルサイズが増える |
| Material UI | 完成度の高いコンポーネント群 | カスタマイズに学習コストがある |

---

## Material UI（MUI）

Google の Material Design に基づいた React UI コンポーネントライブラリです。ゼロから CSS を書かずに整ったデザインの UI を構築できます。

```jsx
import { Button, TextField, Box } from '@mui/material';

export default function LoginForm() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="メールアドレス" variant="outlined" />
      <TextField label="パスワード" type="password" variant="outlined" />
      <Button variant="contained">ログイン</Button>
    </Box>
  );
}
```

テーマのカスタマイズや、ダーク/ライトモードの切り替えも `createTheme` と `ThemeProvider` で対応できます。

---

## アニメーション（Framer Motion）

宣言的にアニメーションを記述できるライブラリです。

```jsx
import { motion, AnimatePresence } from 'framer-motion';

// 入場・ホバーアニメーション
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
>
  アニメーション付きボックス
</motion.div>

// 削除アニメーション（AnimatePresence が必要）
<AnimatePresence>
  {show && (
    <motion.div exit={{ opacity: 0 }}>
      消えるときにフェードアウト
    </motion.div>
  )}
</AnimatePresence>
```

複数の状態をまとめて定義する「バリアント」を使うと、複雑なアニメーションをすっきり書けます。

---

## useEffect（副作用の管理）

レンダリング後に実行したい処理（API 呼び出し・タイマー・DOM 操作など）を登録するフックです。

```jsx
import { useEffect, useState } from 'react';

export default function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json));
  }, [url]); // url が変化するたびに再実行

  return <p>{data?.title}</p>;
}
```

> **ポイント**: 第 2 引数の「依存配列」で実行タイミングを制御します。
> - `[]` → 初回レンダリング後に 1 回だけ実行
> - `[value]` → `value` が変化するたびに実行
> - 省略 → 毎回レンダリング後に実行（ほぼ使わない）

### useLayoutEffect ― ブラウザ描画前に同期実行する

`useLayoutEffect` は `useEffect` とほぼ同じ API ですが、実行タイミングが異なります。

| フック | 実行タイミング | 動作 |
|--------|-------------|------|
| `useEffect` | ブラウザが画面を描画した**後** | 非同期。描画をブロックしない |
| `useLayoutEffect` | DOM 更新後、ブラウザが画面を描画する**前** | 同期。描画をブロックする |

```jsx
import { useEffect, useLayoutEffect, useState } from 'react';

export default function Example() {
  const [width, setWidth] = useState(0);

  // DOM のサイズを取得してから描画したいとき → useLayoutEffect
  useLayoutEffect(() => {
    setWidth(document.getElementById('box').offsetWidth);
  }, []);

  // API 呼び出しなど、画面描画を遅らせる必要がない処理 → useEffect
  useEffect(() => {
    fetch('/api/data').then(/* ... */);
  }, []);

  return <div id="box">幅: {width}px</div>;
}
```

> **ポイント**: `useLayoutEffect` は DOM のサイズや位置を計測してから描画したい場合など、「描画前に同期的に処理しないとちらつきが出る」ケースで使います。それ以外は `useEffect` が適切です。サーバーサイドレンダリング（SSR）環境では `useLayoutEffect` は警告が出るため注意が必要です。

---

## SWR（データ取得ライブラリ）

Vercel が開発したデータ取得ライブラリです。キャッシュ・再検証・ローディング状態・エラーハンドリングをシンプルな API で扱えます。

```jsx
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function WeatherWidget() {
  const { data, isLoading, error } = useSWR('/api/weather', fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error)     return <p>エラーが発生しました</p>;

  return <p>天気: {data.weather[0].description}</p>;
}
```

> **ポイント**: URL がキャッシュのキーになります。同じ URL を複数のコンポーネントで使っても、リクエストは 1 回だけ送られます。ウィンドウにフォーカスが戻ったタイミングで自動的に再取得する機能も内蔵しています。

### useEffect + fetch との比較

SWR を使う前は `useEffect` と `useState` を組み合わせてデータ取得を実装します。SWR はこのパターンを置き換えます。

```jsx
// useEffect + fetch：自前でローディング・エラー・再取得を管理する必要がある
export default function WeatherWithEffect() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // ...
}

// SWR：同じことが 3 行で書ける
export default function WeatherWithSWR() {
  const { data, isLoading, error } = useSWR(endpoint, fetcher);
  // ...
}
```

### SWRConfig ― グローバル設定

`<SWRConfig>` を使うと、アプリ全体の fetcher や動作設定を一箇所で定義できます。

```jsx
import { SWRConfig } from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function App() {
  return (
    <SWRConfig value={{ fetcher, suspense: true }}>
      {/* 配下の useSWR は fetcher を自動で使う */}
      <WeatherWidget />
      <ForecastWidget />
    </SWRConfig>
  );
}
```

### Suspense / Error Boundary との連携

`suspense: true` を有効にすると、`isLoading` の判定が不要になり、`<Suspense>` と `<ErrorBoundary>` に処理を委譲できます。

```jsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function SWRApp() {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        setTimeout(resetErrorBoundary, 5000); // 5秒後に自動リトライ
        return <p>{error.message}</p>;
      }}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <SWRConfig value={{ fetcher, suspense: true }}>
          <WeatherWidget />  {/* data が undefined になることはない */}
        </SWRConfig>
      </Suspense>
    </ErrorBoundary>
  );
}

// suspense: true のとき、isLoading チェックが不要になる
function WeatherWidget() {
  const { data } = useSWR(endpoint); // data は必ず存在する状態でレンダリングされる
  return <p>{data.weather[0].description}</p>;
}
```

### データ取得ロジックをカスタムフックに切り出す

複数のコンポーネントが同じエンドポイントのデータを使うとき、カスタムフックに切り出すと再利用できます。SWR のキャッシュにより、同じフックを複数箇所で呼んでもリクエストは 1 回だけです。

```jsx
// データ取得をカスタムフックにまとめる
function useWeather() {
  const { data } = useSWR(endpoint);
  return data;
}

// 別々のコンポーネントが同じフックを使ってもリクエストは 1 回
function WeatherIcon() {
  const data = useWeather();
  return <img src={`.../${data?.weather[0].icon}.png`} />;
}

function WeatherDetails() {
  const data = useWeather();
  return (
    <ul>
      <li>気温: {Math.floor(data?.main.temp - 273.15)}℃</li>
      <li>風速: {data?.wind.speed} m/s</li>
    </ul>
  );
}
```

---

## useRef

`useRef` で管理する値が変わっても**再レンダリングは起きません**。DOM 要素への参照としても使えます。

```jsx
import { useRef, useState } from 'react';

export default function Timer() {
  const timerId = useRef(null); // レンダリングに不要だが保持したい値
  const [count, setCount] = useState(0);

  const start = () => {
    if (timerId.current === null) {
      timerId.current = setInterval(() => setCount(c => c + 1), 1000);
    }
  };

  const stop = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <p>{count}</p>
    </>
  );
}
```

> **ポイント**: `setInterval` の ID は画面表示には使わないので State ではなく Ref が適切です。「レンダリングに不要だが、レンダリング間で保持したい値」に使います。

### forwardRef ― 親から子の DOM 要素にアクセスする

```jsx
import { forwardRef } from 'react';

// 子コンポーネント
const MyTextBox = forwardRef((props, ref) => (
  <input type="text" ref={ref} {...props} />
));

// 親コンポーネント
export default function Parent() {
  const inputRef = useRef(null);
  return (
    <>
      <MyTextBox ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>フォーカス</button>
    </>
  );
}
```

### コールバック Ref ― マウント時に即座に処理する

`useRef` に `useEffect` を組み合わせると「要素が表示されたらフォーカスする」処理が書けますが、`ref` に関数を渡す「コールバック Ref」を使うと同じことを簡潔に書けます。

```jsx
// useRef + useEffect の組み合わせ（冗長）
export default function HookCallbackRef() {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // show が変わるたびに実行
    }
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(!show)}>展開</button>
      {show && <input ref={inputRef} />}
    </>
  );
}

// コールバック Ref（同じことを簡潔に書ける）
export default function HookCallbackRef2() {
  const [show, setShow] = useState(false);
  // ref に関数を渡す。DOM がマウントされると elem に要素が、アンマウントされると null が渡される
  const callbackRef = elem => elem?.focus();

  return (
    <>
      <button onClick={() => setShow(!show)}>展開</button>
      {show && <input ref={callbackRef} />}
    </>
  );
}
```

> **ポイント**: コールバック Ref は DOM 要素がマウントされた瞬間に呼ばれます。`useEffect` と異なり依存配列を気にする必要がなく、「要素が現れたら即座に何かしたい」ケースにシンプルに対応できます。アンマウント時には `null` が渡されるため `elem?.focus()` のようにオプショナルチェーンを使います。

### useImperativeHandle ― 子が親に公開するメソッドを限定する

`forwardRef` で ref を渡すと、親は子の DOM 要素**すべて**にアクセスできてしまいます。`useImperativeHandle` を使うと、親に公開するメソッドを**明示的に絞り込む**ことができます。

```jsx
import { useImperativeHandle, useRef } from 'react';

// 子コンポーネント
export default function MyTextBox({ label, ref }) {
  const input = useRef(null); // 内部の DOM 参照（親には見せない）

  useImperativeHandle(ref, () => ({
    focus() {
      input.current.focus(); // focus だけを公開。他の DOM 操作は隠蔽
    }
  }), []);

  return <label>{label}: <input type="text" ref={input} /></label>;
}

// 親コンポーネント
export default function Parent() {
  const textBoxRef = useRef(null);
  return (
    <>
      <MyTextBox label="Name" ref={textBoxRef} />
      {/* textBoxRef.current.focus() は呼べるが、DOM 直接操作はできない */}
      <button onClick={() => textBoxRef.current.focus()}>フォーカス</button>
    </>
  );
}
```

> **ポイント**: `forwardRef` が「DOM への参照をそのまま渡す」のに対し、`useImperativeHandle` は「子が用意した特定のメソッドだけを渡す」パターンです。コンポーネントの内部実装を隠蔽したいときに使います。

---

## useCallback（関数のメモ化）

`React.memo` でラップした子コンポーネントに関数を Props として渡すとき、毎回新しい関数オブジェクトが生成されて不要な再レンダリングが起きます。`useCallback` で関数をメモ化することでこれを防げます。

```jsx
// increment は count1 が変わらない限り同じ関数オブジェクトを返す
const increment = useCallback(() => setCount1(c => c + 1), []);

// React.memo でラップした子は Props が変わらなければ再レンダリングしない
const MemoButton = memo(({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
));
```

> **ポイント**: `useCallback` は `React.memo` とセットで使うことで効果を発揮します。単体で使っても再レンダリングは防げません。

---

## useReducer（複雑な State の管理）

複数の State が絡み合う場合、`useReducer` を使うと State の更新ロジックを一箇所にまとめられます。

```jsx
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'reset':     return { count: 0 };
    default:          return state;
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>リセット</button>
      <p>{state.count}</p>
    </>
  );
}
```

> **ポイント**: `dispatch` に `{ type: '...' }` という Action オブジェクトを渡すと、`reducer` 関数が新しい State を返します。「何が起きたか（Action）」と「どう変わるか（reducer）」を分離できるため、複雑な State ロジックを整理しやすくなります。

---

## Context API（グローバルな状態共有）

深くネストしたコンポーネントにデータを渡したいとき、途中のコンポーネントを経由させずに済む仕組みが Context です。

```jsx
// context の作成
import { createContext, useContext } from 'react';
const ThemeContext = createContext('light');

// Provider でデータを供給
export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext value={theme}>
      <DeepNestedComponent />
    </ThemeContext>
  );
}

// どこにいても useContext で取得できる
function DeepNestedComponent() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>コンテンツ</div>;
}
```

> **ポイント**: Context はダークモード・認証情報・言語設定など「アプリ全体に関わる設定」に向いています。頻繁に変わるデータに使うと、Provider 配下のコンポーネント全体が再レンダリングされるため、更新頻度が高いデータには Jotai などのライブラリを検討します。

---

## Jotai（グローバル状態管理ライブラリ）

Context API は設計が複雑になりやすく、パフォーマンス面の課題もあります。Jotai は `atom` という単位でグローバル State を管理し、`useState` と同じ感覚で使えます。

```js
// atom.js
import { atom } from 'jotai';

export const countAtom = atom(0);    // グローバルなカウンター
export const todoAtom  = atom([]);   // グローバルな Todo リスト
```

```jsx
// どのコンポーネントからでも同じ atom を共有できる
import { useAtom } from 'jotai';
import { countAtom } from './atom';

export default function Counter() {
  const [count, setCount] = useAtom(countAtom); // useState と同じ API
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <p>{count}</p>
    </>
  );
}
```

> **ポイント**: 同じ `countAtom` を別のコンポーネントで `useAtom` すれば、値が自動的に同期されます。Context と異なり、atom を使っているコンポーネントだけが再レンダリングされます。

### 派生 atom と書き込み専用 atom

atom は値を持つだけでなく、他の atom から計算した値や、更新ロジックを持たせることもできます。

```js
import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';

// atomWithStorage: localStorage と自動同期。ページをリロードしても値が残る
export const todosAtom = atomWithStorage('todos', []);

// atomWithReset: RESET シンボルで初期値に戻せる atom
export const counterAtom = atomWithReset(0);

// 読み取り専用の派生 atom: 他の atom の値を使って計算する
export const lastIdAtom = atom(get => {
  const todos = get(todosAtom);
  return todos.at(-1)?.id ?? 0;
});

// 書き込み専用 atom: 更新ロジックを atom にカプセル化する
export const todoAddAtom = atom(null, (get, set, title) => {
  set(todosAtom, [
    ...get(todosAtom),
    { id: get(lastIdAtom) + 1, title, isDone: false }
  ]);
});
```

書き込み専用 atom を使うコンポーネント側はすっきりします：

```jsx
import { useAtomValue, useSetAtom } from 'jotai';

export default function TodoList() {
  const todos   = useAtomValue(todosAtom);  // 読み取りのみ（setterを受け取らない）
  const todoAdd = useSetAtom(todoAddAtom);  // 書き込みのみ（値を受け取らない）

  return (
    <>
      <button onClick={() => todoAdd('新しいTodo')}>追加</button>
      <ul>{todos.map(t => <li key={t.id}>{t.title}</li>)}</ul>
    </>
  );
}
```

> **ポイント**: `useAtom` は読み書き両方を返しますが、`useAtomValue`（読み取り専用）と `useSetAtom`（書き込み専用）を使い分けると、不要な再レンダリングをさらに抑えられます。

### Provider と createStore ― atom のスコープを分ける

デフォルトでは、すべての atom はグローバルな単一ストアで管理されます。`<Provider>` と `createStore()` を使うと、**同じ atom でもコンポーネントツリーごとに独立した値を持たせる**ことができます。

```jsx
import { createStore, Provider } from 'jotai';

const storeA = createStore();
const storeB = createStore();

export default function App() {
  return (
    <>
      {/* storeA の countAtom と storeB の countAtom は独立している */}
      <Provider store={storeA}>
        <Counter />  {/* このカウンターは storeA の値を使う */}
      </Provider>

      <Provider store={storeB}>
        <Counter />  {/* このカウンターは storeB の値を使う（storeA とは別） */}
      </Provider>

      {/* Provider なし：グローバルストアの値を使う */}
      <Counter />
    </>
  );
}
```

> **ポイント**: `<Provider>` を使う典型的なケースは、同じコンポーネントを画面内に複数置いて、それぞれが独立した状態を持つべき場面です（例：複数の独立したウィジェット）。テスト環境でグローバルな状態を分離したいときにも使えます。

---

## Storybook（コンポーネントカタログ）

Storybook はコンポーネントを独立した環境でインタラクティブに確認できるツールです。

```jsx
// MyButton.stories.jsx
export default {
  component: MyButton,
  args: { label: 'ボタン' },
};

export const Primary = {
  args: { variant: 'primary', label: 'Primary' },
};

export const Secondary = {
  args: { variant: 'secondary', label: 'Secondary' },
};
```

Props をブラウザ上で変更しながら動作確認できるため、デザイナーとの共有やコンポーネントの仕様確認に役立ちます。

---

## Hooks チートシート

| Hook | 用途 | よくある使い所 |
|------|------|--------------|
| `useState` | UI に関わる値を管理 | カウンター・フォーム入力・モーダル開閉 |
| `useEffect` | レンダリング後の副作用 | API 呼び出し・タイマー・イベントリスナー |
| `useRef` | 再描画なしの値保持・DOM 参照 | タイマー ID・フォーカス操作 |
| `useImperativeHandle` | 子から親に公開するメソッドを限定 | `forwardRef` と組み合わせて使用 |
| `useCallback` | 関数のメモ化 | `React.memo` の子へのハンドラ渡し |
| `useLayoutEffect` | DOM 更新後・描画前に同期実行 | DOM サイズ計測・ちらつき防止 |
| `useReducer` | 複雑な State 更新ロジック | State の項目が多いフォーム・Todo |
| `useContext` | Context からの値取得 | テーマ・認証情報 |
| `useDebugValue` | カスタムフック内のデバッグ情報を DevTools に表示 | カスタムフック開発時 |
| `use` | Promise・Context を直接読み取る（React 19） | Suspense と組み合わせた非同期データ取得 |
