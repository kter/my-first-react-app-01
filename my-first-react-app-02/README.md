# React 応用ガイド

[入門ガイド](../README.md) の続きです。パフォーマンス最適化・並行機能・Server Actions・カスタムフックなど、実際のプロダクト開発で役立つ応用パターンをまとめています。

---

## useMemo と React.memo（パフォーマンス最適化）

React は State や Props が変化するとコンポーネントを再レンダリングします。シンプルなアプリでは問題ありませんが、リスト件数が多い・計算が重い・子コンポーネントが多いケースでは無駄な再計算が起きてアプリが遅くなります。

### useMemo ― 計算結果をキャッシュする

```jsx
import { useMemo, useState } from 'react';

export default function HeavyComponent() {
  const [count, setCount] = useState(0);
  const [otherValue, setOtherValue] = useState(0);

  // count が変わったときだけ再計算。otherValue が変わっても再計算しない
  const result = useMemo(() => {
    return expensiveCalculation(count); // 重い処理
  }, [count]);

  return (
    <>
      <p>計算結果: {result}</p>
      <button onClick={() => setCount(c => c + 1)}>count: {count}</button>
      <button onClick={() => setOtherValue(v => v + 1)}>other: {otherValue}</button>
    </>
  );
}
```

> **ポイント**: 依存配列に指定した値が変わったときだけ再計算します。`otherValue` が変化しても、`count` が変わっていなければ `expensiveCalculation` はスキップされます。

### React.memo ― 子コンポーネントの不要な再レンダリングを防ぐ

```jsx
import { memo } from 'react';

// Props が変わらない限り再レンダリングしない
export const MyButton = memo(({ onClick, children }) => {
  console.log('render'); // 呼ばれる回数を確認できる
  return <button onClick={onClick}>{children}</button>;
});
```

`React.memo` は Props を浅い比較で判定します。関数は毎回新しいオブジェクトとして生成されるため、`useCallback` とセットで使います。

```jsx
// 親コンポーネント
const increment = useCallback(() => setCount(c => c + 1), []);
// increment は count が変わっても同じ関数参照を返す → MyButton が再レンダリングしない
<MyButton onClick={increment}>Count UP</MyButton>
```

### useMemo vs useCallback

| Hook | メモ化するもの | 典型的なユースケース |
|------|--------------|------------------|
| `useMemo` | **値**（計算結果） | 重い計算・フィルタ済みリストなど |
| `useCallback` | **関数** | `React.memo` の子コンポーネントに渡すハンドラ |

---

## useTransition（UI の応答性を維持する）

React 18 から導入された並行機能のひとつです。State の更新に**優先度**をつけられます。

たとえば検索ボックスで文字を打つとき：
- **高優先度（緊急）**: テキストボックスへの入力を即座に反映する
- **低優先度（非緊急）**: 入力結果に応じたリストの絞り込みを後から実行する

この優先度付けにより、重い更新処理中も入力 UI がもたつかなくなります。

```jsx
import { useState, useTransition } from 'react';

export default function SearchPage() {
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = e => {
    setQuery(e.target.value);           // 緊急：入力欄を即座に更新

    startTransition(() => {
      setResults(search(e.target.value)); // 非緊急：検索結果は遅れても良い
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <p>検索中...</p>}
      <ul>
        {results.map(r => <li key={r.id}>{r.title}</li>)}
      </ul>
    </>
  );
}
```

> **ポイント**: `startTransition` 内の State 更新は「中断可能」になります。より緊急な更新（ユーザーの入力など）が入ると一旦後回しにします。`isPending` が `true` の間はローディング表示を出せます。

---

## useDeferredValue（値の描画を遅延させる）

`useTransition` が「更新を実行する側」でコントロールするのに対し、`useDeferredValue` は「値を受け取る側」で遅延を制御します。

```jsx
import { useDeferredValue, useState } from 'react';

export default function HeavyList() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text); // text の「遅延バージョン」

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* text は即座に更新され、deferredText は遅れて更新される */}
      {[...Array(10000)].map((_, i) => <p key={i}>{deferredText}</p>)}
    </>
  );
}
```

> **ポイント**: `deferredText` は `text` より古い値を保持しながら、バックグラウンドで最新値への更新を準備します。入力欄は即座に反映されるため、ユーザーには遅さを感じさせません。

### useDeferredValue で isPending を検出する

`useTransition` の `isPending` に相当する「遅延中かどうか」は、`useDeferredValue` では元の値と遅延値を比較することで判定できます。

```jsx
import { useDeferredValue, useState } from 'react';

export default function HookDeferredTransition() {
  const [comments, setComments] = useState([]);
  const deferredComments = useDeferredValue(comments);

  // 元の値と遅延値が異なる間 = 遅延レンダリング中
  const isPending = comments !== deferredComments;

  return (
    <>
      <select onChange={e => setComments(filter(e.target.value))}>...</select>
      {/* isPending の間はリストを半透明にして「更新中」を表現 */}
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {deferredComments.map(c => <li key={c.id}>{c.body}</li>)}
      </ul>
    </>
  );
}
```

> **ポイント**: `useTransition` が使えるのは自分でトリガーする State 更新に限られますが、`useDeferredValue` はコンポーネントが外部から受け取った値（Props や外部ストアの値）にも適用できます。

### useTransition vs useDeferredValue

| Hook | 制御するもの | 使い所 |
|------|------------|--------|
| `useTransition` | State **更新の実行** | ハンドラ内でどの更新を遅延させるかを決める |
| `useDeferredValue` | **値**の読み取り | 受け取った値の描画を遅延させる（外部から受け取った値にも有効） |

---

## useActionState と Server Actions

React 19 から使えるようになった機能です。フォームの送信処理（バリデーション・API 呼び出し・結果の反映）をひとつのフックでまとめて管理できます。

```jsx
import { useActionState } from 'react';

export default function BookForm() {
  const [books, setBooks] = useState([]);

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      // フォーム送信時に実行される非同期処理
      const { result, errors } = await saveBook({
        title:     formData.get('title'),
        price:     formData.get('price'),
        published: formData.get('published'),
      });

      if (!errors) {
        setBooks(prev => [...prev, result]);
      }

      return errors; // エラーがあれば error に格納される
    },
    null // error の初期値
  );

  return (
    <form action={submitAction}>     {/* onSubmit ではなく action に渡す */}
      {error?.map(msg => <li key={msg}>{msg}</li>)}
      <input name="title" type="text" />
      <input name="price" type="number" />
      <input name="published" type="date" />
      <button type="submit" disabled={isPending}>保存</button>
    </form>
  );
}
```

> **ポイント**: `useActionState` は 3 つの値を返します。
> - `error`: アクションが返した値（バリデーションエラーなど）
> - `submitAction`: フォームの `action` に渡す関数
> - `isPending`: 処理中かどうか（ボタンの `disabled` などに使う）

### useFormStatus ― フォーム送信状態をどこからでも読む

`useFormStatus` を使うと、フォームの子孫コンポーネントからフォームの送信状態を取得できます。

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus(); // 親フォームの送信状態を取得
  return (
    <button type="submit" disabled={pending}>
      {pending ? '送信中...' : '送信'}
    </button>
  );
}
```

---

## useOptimistic（楽観的更新）

ネットワーク経由のデータ保存は時間がかかります。「楽観的更新」とは、**サーバーの処理が完了する前に UI を先に更新してしまう**手法です。エラーが返ってきたら自動で元に戻ります。

```jsx
import { useOptimistic, useActionState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);

  const [optimisticBooks, setOptimisticBooks] = useOptimistic(
    books,                       // 確定済みの実データ
    (prevBooks, formData) => [   // 楽観的な更新関数（即座に UI を変える）
      ...prevBooks,
      {
        title:     formData.get('title'),
        price:     formData.get('price'),
        updating:  true          // 「まだ確定していない」フラグ
      }
    ]
  );

  const [, submitAction] = useActionState(
    async (_, formData) => {
      setOptimisticBooks(formData);          // 即座に UI を更新（楽観的）

      const { result, errors } = await saveBook({ ... }); // サーバー送信

      if (!errors) {
        setBooks(prev => [...prev, result]); // 確定したら実データを更新
      }
      return errors;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input name="title" /><input name="price" />
      <button type="submit">追加</button>
      <ul>
        {optimisticBooks.map((book, i) => (
          <li key={i}>
            {book.title}
            {book.updating && <small>（保存中...）</small>}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

処理の流れ：

```
ユーザーが Submit
  ↓
setOptimisticBooks → UI にすぐ「（保存中...）」付きで追加される
  ↓
await saveBook(...) → サーバー処理中
  ↓（数百ミリ秒後）
setBooks で実データを更新 → 「（保存中...）」が消えて確定表示に変わる
```

> **ポイント**: `optimisticBooks` は `setOptimisticBooks` を呼んだ直後から変化します。サーバー処理が完了または失敗すると、自動的に `books`（実データ）の値に戻ります。

---

## カスタムフック（ロジックの再利用）

カスタムフックは、複数の Hooks を組み合わせたロジックをコンポーネントから切り出して**再利用可能**にする仕組みです。`use` で始まる名前にするのが React のルールです。

```jsx
import { useReducer, useDebugValue } from 'react';

// useCounter カスタムフック
export default function useCounter(init, step) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'increment': return { count: state.count + action.step };
        case 'decrement': return { count: state.count - action.step };
        case 'reset':     return { count: action.init };
        default:          return state;
      }
    },
    { count: init }
  );

  // React DevTools に表示されるデバッグ情報
  useDebugValue(state.count >= 10 ? 'over 10' : 'less than 10');

  return [
    state,
    () => dispatch({ type: 'increment', step }),
    () => dispatch({ type: 'decrement', step }),
    () => dispatch({ type: 'reset', init }),
  ];
}
```

このフックを使う側では `useReducer` のロジックを一切書かずに済みます：

```jsx
export default function CounterPage() {
  const [state, increment, decrement, reset] = useCounter(0, 3);

  return (
    <>
      <p>{state.count}</p>
      <button onClick={increment}>+3</button>
      <button onClick={decrement}>-3</button>
      <button onClick={reset}>リセット</button>
    </>
  );
}
```

> **ポイント**: カスタムフックへの切り出しはリファクタリングの一形態です。「同じロジックを複数のコンポーネントで使いたい」「コンポーネントのコードが長くなってきた」ときに検討します。

---

## Hooks チートシート（応用編）

| Hook | 用途 | 典型的なユースケース |
|------|------|------------------|
| `useMemo` | 値のメモ化 | 重い計算・フィルタ済みリスト |
| `useCallback` | 関数のメモ化 | `React.memo` の子へ渡すハンドラ |
| `useTransition` | 更新の優先度付け | 検索・タブ切り替え |
| `useDeferredValue` | 値の描画遅延 | 大きなリストの絞り込み |
| `useActionState` | フォームアクション管理 | フォーム送信・バリデーション |
| `useFormStatus` | フォームの送信状態取得 | 送信ボタンのローディング表示 |
| `useOptimistic` | 楽観的更新 | SNS の「いいね」・メッセージ送信 |

### React 19 の新 Hooks まとめ

| Hook | 説明 |
|------|------|
| `useActionState` | フォームアクションの状態（result / isPending）を管理 |
| `useFormStatus` | 親フォームの送信状態（pending）をどこからでも読める |
| `useOptimistic` | サーバー完了前に UI を先に更新し、完了後に確定する |
