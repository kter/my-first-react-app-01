// export default function MyHello(props) {
//   return (
//     <div> Hello, {props.myName} ! </div>
//   );
// }

//// 分割代入を使う. レシーバーとしてpropsをいちいち指定しなくて良くなる
export default function MyHello({ myName }) {
  return (
    <div> Hello, {myName} ! </div>
  );
}
